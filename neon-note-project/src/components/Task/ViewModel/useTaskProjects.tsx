import { useEffect } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { MockProps, ProjectProps } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from './useTaskSidebarAllFolders';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useRouter } from 'next/router';
import { generateIdProjects } from '@/utils/generateId';
import { v4 as uuidv4 } from 'uuid';

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
    if (!id) {
      errorToast('Nenhuma pasta selecionada.');
      return;
    }

    const newProject: ProjectProps = {
      id: uuidv4(),
      projectName: projectName,
      projectTasks: {
        total: 0,
        status: {
          toStart: [],
          inProgress: [],
          finished: [],
        },
      },
    };

    const updatedFolders = foldersTask.map(folder =>
      folder.id === id
        ? { ...folder, projects: [...folder.projects, newProject] }
        : folder
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
      setFoldersTask(updatedFolders);
      setListProjects(prevProjects => [...prevProjects, newProject]);
    }

    setNewTaskProjectName('');
    successToast('Projeto criado!');
  };

  function deleteTaskProject(projectId: string) {
    const updatedFolders = foldersTask.map(folder => ({
      ...folder,
      projects: folder.projects.filter(project => project.id !== projectId),
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
      setFoldersTask(updatedFolders);
      successToast('Projeto deletado!');
      router.replace(`/tasksFolders/${id}`);
    };
  };

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
    deleteTaskProject,
  };
}
