import { errorToast, successToast, warningToast } from '@/utils/toasts/toasts';
import { useContextTaskData } from '../../Context/TaskContext/TaskContext';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  MockProps,
  ProjectTasksPropsStatus,
  StatusTasksFromProjectProps,
} from '@/utils/mockFolders';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

export function useCardTasks() {
  const {
    foldersTask,
    tasksToStartInProject,
    setTasksToStartInProject,
    tasksInProgressInProject,
    setTasksInProgressInProject,
    tasksFinishedInProject,
    setTasksFinishedInProject,
    setFoldersTask,
    nameCreatedTask,
    setNameCreatedTask,
    descriptionCreatedTask,
    setDescriptionCreatedTask,
    limitDateToFinishTask,
    setLimitDateToFinishTask,
    levelPriorityTask,
    setLevelPriorityTask,
  } = useContextTaskData();

  const {
    open: isOpenModalViewCardTask,
    onOpen: onOpenModalViewCardTask,
    onClose: onCloseModalViewCardTask,
  } = useDisclosure();

  const {
    open: openModalCreateCard,
    onOpen: onOpenModalCreateCard,
    onClose: onCloseModalCreateCard,
  } = useDisclosure();

  const router = useRouter();
  const { id, projectId } = router.query;

  function validCreateCardTask(title: string, levelPriorityTask: string) {
    if (title === '' || levelPriorityTask === '') {
      errorToast('Erro: título ou prioridade da tarefa vazia.');
      return null;
    }

    const titleWithoutSpaces = title.trim().length > 0 && title.trim().length <= 100;
    if (!titleWithoutSpaces) {
      errorToast('Erro: Título da tarefa deve ter entre 1 e 100 caracteres.');
      return null;
    };
  }

  function createCardTask(
    status: keyof ProjectTasksPropsStatus,
    title: string,
    description?: string,
    limitDateToFinishTask?: Date,
    levelPriorityTask?: string
  ) {
    try {
      const responseValid = validCreateCardTask(
        title,
        levelPriorityTask as string
      );
      if (responseValid === null) return;
      const newTask: StatusTasksFromProjectProps = {
        id: uuidv4(),
        title,
        description,
        subTasks: [],
        progressTask: 0,
        taskLimitDate: limitDateToFinishTask?.getDate(),
        taskCreatedDate: new Date().toISOString().split('T')[0],
        priority: levelPriorityTask || '',
      };
      const updatedFolders = foldersTask.map(folder =>
        folder.id === id
          ? {
              ...folder,
              projects: folder.projects.map(project =>
                project.id === projectId
                  ? {
                      ...project,
                      projectTasks: {
                        ...project.projectTasks,
                        status: {
                          ...project.projectTasks.status,
                          [status]: [
                            ...project.projectTasks.status[status],
                            newTask,
                          ],
                        },
                      },
                    }
                  : project
              ),
            }
          : folder
      );
      // Atualiza os estados simultaneamente
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        setFoldersTask(updatedFolders);
        setTasksToStartInProject(prevTasks => [...prevTasks, newTask]);
        successToast('Tarefa criada com sucesso');
      }

      // Limpa os inputs do formulário
      [
        setNameCreatedTask,
        setDescriptionCreatedTask,
        setLevelPriorityTask,
      ].forEach(fn => fn('' as any));
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
      errorToast('Erro ao criar a tarefa');
    }
  }

  const statusMap: Record<string, keyof ProjectTasksPropsStatus> = {
    'A iniciar': 'toStart',
    'Em progresso': 'inProgress',
    Finalizada: 'finished',
  };

  function getTasksFromLocalStorage() {
    try {
      const storedFoldersString = localStorage.getItem('foldersTask');
      if (storedFoldersString) {
        const storedFolders: MockProps[] = JSON.parse(storedFoldersString);
        const currentFolder = storedFolders.find(folder => folder.id === id);
        const currentProject = currentFolder?.projects.find(
          project => project.id === projectId
        );
        if (currentFolder && currentProject) {
          const tasksToStart =
            currentProject?.projectTasks?.status['toStart'] || [];
          setTasksToStartInProject(tasksToStart);

          const tasksInProgress =
            currentProject?.projectTasks?.status['inProgress'] || [];
          setTasksInProgressInProject(tasksInProgress);

          const tasksFinished =
            currentProject?.projectTasks?.status['finished'] || [];
          setTasksFinishedInProject(tasksFinished);
        }
      }
    } catch (error) {
      console.error('Erro ao obter as tarefas:', error);
      errorToast('Erro ao obter as tarefas');
    }
  }

  function validUpdateCardTask(
    updateTitle: string,
    updatePriority: string,
    updateDescription?: string
  ) {
    const validateTitleAndPriority = updateTitle === '' || updatePriority === '';
    if (validateTitleAndPriority) {
      errorToast('Erro: título ou prioridade da tarefa vazia.');
      return null;
    };

    const validateNumberOfCharactersTitle = updateTitle?.trim().length > 0 && updateTitle?.trim().length <= 100;
    if (!validateNumberOfCharactersTitle) {
      errorToast('Erro: Título da tarefa deve ter entre 1 e 100 caracteres.');
      return null;
    };

    const validateTitleAndPriorityExists = foldersTask.some(folder => {
      const validToStart = folder.projects.some(project =>
        project.projectTasks.status.toStart.some(
          task =>
            task.title === updateTitle &&
            task.priority === updatePriority &&
            task.description === updateDescription
        )
      );
      const validInProgress = folder.projects.some(project =>
        project.projectTasks.status.inProgress.some(
          task =>
            task.title === updateTitle &&
            task.priority === updatePriority &&
            task.description === updateDescription
        )
      );
      const finished = folder.projects.some(project =>
        project.projectTasks.status.inProgress.some(
          task =>
            task.title === updateTitle &&
            task.priority === updatePriority &&
            task.description === updateDescription
        )
      );
      return validToStart || validInProgress || finished;
    });
    if (validateTitleAndPriorityExists) {
      warningToast('AVISO: Não houve mudanças.');
      return null;
    }
  }

  function updateCardTask(
    status: string,
    taskId: string,
    updateTitle: string,
    updateDescription: string,
    updatePriority: string
  ) {
    const responseValid = validUpdateCardTask(
      updateTitle,
      updatePriority,
      updateDescription
    );
    if (responseValid === null) return;

    try {
      const updateDataCard = foldersTask.map(folder => ({
        ...folder,
        projects: folder.projects.map(project =>
          project.id === projectId
            ? {
                ...project,
                projectTasks: {
                  ...project.projectTasks,
                  status: {
                    ...project.projectTasks.status,
                    toStart: project.projectTasks.status.toStart.map(task =>
                      task.id === taskId
                        ? {
                            ...task,
                            title: updateTitle,
                            description: updateDescription,
                            priority: updatePriority,
                          }
                        : task
                    ),
                    inProgress: project.projectTasks.status.inProgress.map(
                      task =>
                        task.id === taskId
                          ? {
                              ...task,
                              title: updateTitle,
                              description: updateDescription,
                              priority: updatePriority,
                            }
                          : task
                    ),
                    finished: project.projectTasks.status.finished.map(task => {
                      if (task.id === taskId) {
                        warningToast(
                          'Não é permitido alterar tarefas finalizadas!'
                        );
                        return task;
                      }
                      return task;
                    }),
                  },
                },
              }
            : project
        ),
      }));

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updateDataCard));
        setFoldersTask(updateDataCard);
      }
      onCloseModalViewCardTask();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      errorToast('Erro ao editar tarefa');
    }
  }

  function deleteCardTask(cardTaskId: string) {
    try {
      const updatedFolders = foldersTask.map(folder => ({
        ...folder,
        projects: folder.projects.map(project =>
          project.id === projectId
            ? {
                ...project,
                projectTasks: {
                  ...project.projectTasks,
                  status: {
                    ...project.projectTasks.status,
                    toStart: project.projectTasks.status.toStart.filter(
                      task => task.id !== cardTaskId
                    ),
                    inProgress: project.projectTasks.status.inProgress.filter(
                      task => task.id !== cardTaskId
                    ),
                    finished: project.projectTasks.status.finished.filter(
                      task => task.id !== cardTaskId
                    ),
                  },
                },
              }
            : project
        ),
      }));

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        setFoldersTask(updatedFolders);
      }
      successToast('Tarefa excluida com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      errorToast('Erro ao excluir tarefa');
    }
  }

  function moveCard(taskId: string, fromStatus: string, toStatus: string) {
    try {
      const fromKey = statusMap[fromStatus];
      const toKey = statusMap[toStatus];

      if (!fromKey || !toKey) {
        console.error(`Status inválido: De "${fromStatus}" Para "${toStatus}"`);
        return;
      }

      const updatedFolders = foldersTask.map(folder => ({
        ...folder,
        projects: folder.projects.map(project => {
          if (project.id !== projectId) return project;

          const currentTasks = project.projectTasks.status || {};
          const fromTasks = currentTasks[fromKey] || [];
          const toTasks = currentTasks[toKey] || [];

          const taskToMove = fromTasks.find(task => task.id === taskId);
          if (!taskToMove) {
            console.error(
              `Tarefa ${taskId} não encontrada no status ${fromStatus}`
            );
            return project;
          }

          return {
            ...project,
            projectTasks: {
              ...project.projectTasks,
              status: {
                ...currentTasks,
                [fromKey]: fromTasks.filter(task => task.id !== taskId),
                [toKey]: [...toTasks, taskToMove],
              },
            },
          };
        }),
      }));

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        setFoldersTask([...updatedFolders]);
      }

      successToast('Tarefa movida com sucesso!');
    } catch (error) {
      console.error('Erro ao mover a tarefa:', error);
      errorToast('Erro ao mover a tarefa');
    }
  }

  useEffect(() => {
    getTasksFromLocalStorage();
  }, [id, projectId, foldersTask]);

  return {
    tasksToStartInProject,
    setTasksToStartInProject,
    tasksInProgressInProject,
    tasksFinishedInProject,

    createCardTask,
    updateCardTask,
    deleteCardTask,

    nameCreatedTask,
    setNameCreatedTask,

    descriptionCreatedTask,
    setDescriptionCreatedTask,

    limitDateToFinishTask,
    setLimitDateToFinishTask,

    levelPriorityTask,
    setLevelPriorityTask,

    isOpenModalViewCardTask,
    onOpenModalViewCardTask,
    onCloseModalViewCardTask,

    openModalCreateCard,
    onOpenModalCreateCard,
    onCloseModalCreateCard,
    moveCard,
  };
}
