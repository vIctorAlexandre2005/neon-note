import { useEffect } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { MockProps, ProjectProps } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from './useTaskSidebarAllFolders';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useRouter } from 'next/router';

export function useTaskProjects() {
  const {
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
    setListProjects,
    foldersTask,
    setFoldersTask,
  } = useContextTaskData();

  const router = useRouter();
  const { id } = router.query;

  function handleCreateTaskProject(projectName: string) {
    try {
      if (!id) {
        errorToast('Erro: Nenhuma pasta selecionada.');
        return;
      }
      const totalProjects = listProjects.length + 1;
      const newProject: ProjectProps = {
        id: totalProjects.toString(),
        projectName: projectName,
      };
      // Encontra a pasta correspondente ao id atual da rota
      const updatedFolders = foldersTask.map(folder =>
        folder.id === id
          ? { ...folder, projects: [...folder.projects, newProject] }
          : folder
      );
      // Atualizar o array de projetos apenas na pasta correta
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        setFoldersTask(updatedFolders);
        setListProjects(prevProjects => [...prevProjects, newProject]);
      }

      setNewTaskProjectName('');
      successToast('Projeto criado!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      errorToast('Erro ao criar projeto');
    }
  }

  const selectedFolder = foldersTask.find(folder => folder.id === id);
  function getTaskProjects() {
    if (!id) {
      errorToast('Erro: Nenhuma pasta selecionada.');
      return;
    }
    const foldersData = localStorage.getItem('foldersTask');
    if (foldersData) {
      try {
        const folders: MockProps[] = JSON.parse(foldersData);
        const currentFolder = folders.find(folder => folder.id === id);

        setListProjects(currentFolder?.projects || []);
      } catch (error) {
        console.error('Erro ao processar dados das pastas:', error);
        errorToast('Erro ao buscar projetos');
      }
    }
  }

  useEffect(() => {
    getTaskProjects();
  }, [selectedFolder, id]);

  return {
    handleCreateTaskProject,
    getTaskProjects,
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
    foldersTask,
  };
}
