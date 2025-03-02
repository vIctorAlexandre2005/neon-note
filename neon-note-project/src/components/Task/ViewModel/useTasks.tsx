import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
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
            currentProject?.projectTasks?.status.toStart || [];
          setTasksToStartInProject(tasksToStart);
        }
      }
    } catch (error) {
      console.error('Erro ao obter as tarefas:', error);
      errorToast('Erro ao obter as tarefas');
    }
  };

  function validUpdateCardTask(updateTitle: string, updatePriority: string) {
    const validateTitleAndPriority = updateTitle === '' || updatePriority === '';
    if (validateTitleAndPriority) {
      errorToast('Erro: título ou prioridade da tarefa vazia.');
      return null;
    };

    const validateNumberOfCharactersTitle = updateTitle?.trim().length > 0 && updateTitle?.trim().length <= 30;
    if (!validateNumberOfCharactersTitle) {
      errorToast('Erro: Título da tarefa deve ter entre 1 e 30 caracteres.');
      return null;      
    };

    const validateTitleExists = foldersTask.some(folder => folder.projects.some(project => project.projectTasks.status.toStart.some(task => task.title === updateTitle)));
    if (validateTitleExists) {
      errorToast('Erro: Título da tarefa já cadastrado.');
      return null;
    };
  };

  function updateCardTask(
    taskId: string,
    updateTitle: string,
    updateDescription: string,
    updatePriority: string
  ) {
    const responseValid = validUpdateCardTask(updateTitle, updatePriority);
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
      successToast('Tarefa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      errorToast('Erro ao editar tarefa');
    }
  };

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
    };
  };

  useEffect(() => {
    getTasksFromLocalStorage();
  }, [id, projectId, foldersTask]);

  return {
    tasksToStartInProject,
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
  };
}
