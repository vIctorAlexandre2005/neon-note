import { useEffect } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { ProjectProps } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from './useTaskSidebarAllFolders';
import { errorToast, successToast } from '@/utils/toasts/toasts';

export function useTaskProjects() {
  const {
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
    setListProjects,
  } = useContextTaskData();

  console.log('listProjects', listProjects);

  function handleCreateTaskProject(projectName: string) {
    try {
      const totalProjects = listProjects.length + 1;
      console.log('totalProjects', totalProjects);

      const newProject: ProjectProps = {
        id: totalProjects.toString(),
        projectName: projectName,
      };

      const updatedProjects = [...listProjects, newProject]; // Adiciona ao array existente
      console.log('updatedProjects', updatedProjects);

      if (typeof window !== 'undefined') {
        localStorage.setItem('taskProjects', JSON.stringify(updatedProjects));
      }
      setListProjects(updatedProjects); // Agora é um array
      setNewTaskProjectName('');
      successToast('Projeto criado!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      errorToast('Erro ao criar projeto');
    }
  }

  function getTaskProjects() {
    try {
      const parsedListTaskProjects = localStorage.getItem('taskProjects');
      if (parsedListTaskProjects) {
        setListProjects(JSON.parse(parsedListTaskProjects) || []); // Garante que sempre será um array
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      errorToast('Erro ao buscar projetos');
    }
  }

  useEffect(() => {
    getTaskProjects();
  }, []);

  return {
    handleCreateTaskProject,
    getTaskProjects,
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
  };
}
