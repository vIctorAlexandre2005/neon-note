import { errorToast } from '@/utils/toasts/toasts';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StatusTasksFromProjectProps } from '@/utils/mockFolders';

export function useCardTasks() {
  const {
    foldersTask,
    tasksToStartInProject,
    setTasksToStartInProject,
    tasksInProgressInProject,
    setTasksInProgressInProject,
    tasksFinishedInProject,
    setTasksFinishedInProject,
    nameCreatedTask,
    setNameCreatedTask,
    descriptionCreatedTask,
    setDescriptionCreatedTask,
    limitDateToFinishTask,
    setLimitDateToFinishTask,
    levelPriorityTask,
    setLevelPriorityTask
  } = useContextTaskData();

  const getListTasks = foldersTask.map(folder =>
    folder.projects.map(project => project.projectTasks)
  );

  const tasksToStart = getListTasks
    .flat()
    .map(tasks => tasks?.status.toStart.map(task => task));
  const tasksInProgress = getListTasks
    .flat()
    .map(tasks => tasks?.status.inProgress);
  const tasksFinished = getListTasks.flat().map(tasks => tasks?.status?.finished);

  function createCardTask(
    status: string,
    title: string,
    description?: string,
    limitDateToFinishTask?: Date
  ) {
    console.log('PARAMS:', status, title, description, limitDateToFinishTask);
    const newTask: StatusTasksFromProjectProps = {
      id: uuidv4(),
      title: title,
      description: description,
      subTasks: [],
      progressTask: 0,
      taskLimitDate: limitDateToFinishTask && limitDateToFinishTask.getDate(),
      taskCreatedDate: new Date().toISOString().split('T')[0],
    };

    const listTaskToStart = [...tasksToStartInProject, newTask];
    const listTaskInProgress = [...tasksInProgress, newTask];
    const listTaskFinished = [...tasksFinished, newTask];

    console.log('listTaskToStart', listTaskToStart)

    const updatedTasks = listTaskToStart;

    try {
      localStorage.setItem(
        'listTasksFromProjects',
        JSON.stringify(updatedTasks)
      );

      if (status === 'toStart') {
        setTasksToStartInProject(updatedTasks as StatusTasksFromProjectProps[]);
      }

      if (status === 'inProgress') {
        setTasksInProgressInProject(
          updatedTasks as StatusTasksFromProjectProps[]
        );
      }

      if (status === 'finished') {
        setTasksFinishedInProject(
          updatedTasks as StatusTasksFromProjectProps[]
        );
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      errorToast('Erro ao criar tarefa');
    }
  };

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
    setLevelPriorityTask
  };
}
