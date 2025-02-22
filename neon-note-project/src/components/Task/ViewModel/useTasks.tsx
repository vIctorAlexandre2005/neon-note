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

  const router = useRouter();
  const { id, projectId } = router.query;

  const currentFolder = foldersTask.find(folder => folder.id === id);

  const getListTasks = foldersTask.map(folder =>
    folder.projects.map(project => project.projectTasks)
  );

  function createCardTask(
    status: keyof ProjectTasksPropsStatus,
    title: string,
    description?: string,
    limitDateToFinishTask?: Date,
    levelPriorityTask?: string
  ) {
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
  }

  function getTasksFromLocalStorage() {
    try {
      const storedFoldersString = localStorage.getItem('foldersTask');
      if (storedFoldersString) {
        const storedFolders: MockProps[] = JSON.parse(storedFoldersString);
        const currentFolder = storedFolders.find(folder => folder.id === id);
        const currentProject = currentFolder?.projects.find(project => project.id === projectId);
        if (currentFolder && currentProject) {
          const tasksToStart = currentProject?.projectTasks?.status.toStart || [];
          setTasksToStartInProject(tasksToStart);
        };
      };
    } catch (error) {
      console.error('Erro ao obter as tarefas:', error);
      errorToast('Erro ao obter as tarefas');
    };
  };

  useEffect(() => {
    getTasksFromLocalStorage();
  }, [id, projectId]);

  return {
    tasksToStartInProject,
    tasksInProgressInProject,
    tasksFinishedInProject,
    createCardTask,
    getListTasks,
    nameCreatedTask,
    setNameCreatedTask,
    descriptionCreatedTask,
    setDescriptionCreatedTask,
    limitDateToFinishTask,
    setLimitDateToFinishTask,
    levelPriorityTask,
    setLevelPriorityTask,
  };
}
