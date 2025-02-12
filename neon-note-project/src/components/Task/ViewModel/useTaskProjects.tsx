import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { mockPastas, MockProps, ProjectProps } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from './useTaskSidebarAllFolders';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/utils/toasts/toasts';

export function useTaskProjects() {
  const {
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
    setListProjects,
  } = useContextTaskData();
  const { mockArray } = useTaskSidebarAllFolders();
  const router = useRouter();

  function handleCreateTaskProject(projectName: string) {
    try {
      const totalProjects = mockArray.map(folder => folder.projects.length + 1);

      const newProject: ProjectProps = {
        id: totalProjects.toString(),
        projectName: projectName,
      };

      const updatedProjects = [...listProjects, newProject]; // Adiciona ao array existente

      if (typeof window !== 'undefined') {
        localStorage.setItem('taskProjects', JSON.stringify(updatedProjects));
      }
      setListProjects(updatedProjects); // Agora é um array
      successToast('Projeto criado!')
    } catch (error) {
      console.error('Erro ao criar:', error);
      errorToast('Erro ao criar projeto');
    };
  };

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
  };

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
