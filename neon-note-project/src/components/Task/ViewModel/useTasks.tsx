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
    label?: string
  ) {
    const newTask: StatusTasksFromProjectProps = {
      id: uuidv4(),
      title: title,
      description: description,
      subTasks: [],
      progressTask: 0,
      totalTasksThisStatus: 0,
      taskLimitDate: new Date().getDate() + 3,
      taskCreatedDate: new Date().toLocaleString(),
      label: label,
    };

    const listTaskToStart = [...tasksToStart, newTask];
    const listTaskInProgress = [...tasksInProgress, newTask];
    const listTaskFinished = [...tasksFinished, newTask];

    const updatedTasks =
      status === 'toStart'
        ? listTaskToStart
        : status === 'inProgress'
          ? listTaskInProgress
          : status === 'finished' && listTaskFinished;

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
        return JSON.parse(listTasksFromProjects);
      }
    } catch (error) {
      console.error('Erro ao obter as pastas:', error);
      errorToast('Erro ao obter as tarefas');
    }
  }

  console.log('tasksToStart', getListTasks);

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
