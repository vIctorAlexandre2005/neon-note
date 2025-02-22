import { errorToast } from '@/utils/toasts/toasts';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ProjectTasksPropsStatus,
  StatusTasksFromProjectProps,
} from '@/utils/mockFolders';

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
  
    // Atualiza as pastas e projetos
    const updatedFolders = foldersTask.map(folder => ({
      ...folder,
      projects: folder.projects.map(project => ({
        ...project,
        projectTasks: {
          ...project.projectTasks,
          status: {
            ...project.projectTasks.status,
            [status]: [...project.projectTasks.status[status], newTask], // ✅ Atualiza o status correto
          },
        },
      })),
    }));
  
    // Atualiza os estados simultaneamente
    setFoldersTask(updatedFolders);
    setTasksToStartInProject(prev => (status === 'toStart' ? [...prev, newTask] : prev));
  
    // Salva no localStorage
    localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
  
    // Limpa os inputs do formulário
    [setNameCreatedTask, setDescriptionCreatedTask, setLevelPriorityTask].forEach(fn => fn('' as any));
  }
  

  useEffect(() => {
    const storedFolders = localStorage.getItem('foldersTask');
    if (storedFolders) {
      setFoldersTask(JSON.parse(storedFolders));
    }
  }, [tasksToStartInProject]);

  function getTasks() {
    try {
      const listTasksFromProjects = localStorage.getItem(
        'listTasksFromProjects'
      );
      if (listTasksFromProjects) {
        const tasks: StatusTasksFromProjectProps[] = JSON.parse(
          listTasksFromProjects
        );
        setTasksToStartInProject(tasks);
      }
    } catch (error) {
      console.error('Erro ao obter as pastas:', error);
      errorToast('Erro ao obter as tarefas');
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

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
