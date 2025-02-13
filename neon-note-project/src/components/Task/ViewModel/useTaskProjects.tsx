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
        folder.id === id ? 
        {...folder, 
          projects: [
            ...folder.projects, 
            newProject
          ]
        } : folder
      );

      // Atualizar o array de projetos apenas na pasta correta
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        setFoldersTask(updatedFolders);
      }

      // Atualiza a lista de projetos da pasta aberta
      setListProjects(prevProjects => [...prevProjects, newProject]);

      setNewTaskProjectName('');
      successToast('Projeto criado!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      errorToast('Erro ao criar projeto');
    }
  }

  const selectedFolder = foldersTask.find(folder => folder.id === id);
  function getTaskProjects() {
    try {
      if (!id) {
        errorToast('Erro: Nenhuma pasta selecionada.');
        return;
      };

      const storedFolders = localStorage.getItem('foldersTask');
      if (storedFolders) {
        const parsedFolders: MockProps[] = JSON.parse(storedFolders);
        // Encontra a pasta correspondente ao id atual
        const selectedFolder = parsedFolders.find(folder => folder.id === id);

        if (selectedFolder) {
          setListProjects(selectedFolder.projects || []); // Garante que seja um array
        } else {
          setListProjects([]); // Se a pasta não for encontrada, retorna um array vazio
        }
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      errorToast('Erro ao buscar projetos');
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
