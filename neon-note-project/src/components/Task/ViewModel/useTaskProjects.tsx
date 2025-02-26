import { useEffect } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { MockProps, ProjectProps } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from './useTaskSidebarAllFolders';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useRouter } from 'next/router';
import { generateIdProjects } from '@/utils/generateId';
import { v4 as uuidv4 } from 'uuid';
import { useDisclosure } from '@chakra-ui/react';
import { log } from 'console';

export function useTaskProjects() {
  const {
    newTaskProjectName,
    setNewTaskProjectName,
    listProjects,
    setListProjects,
    foldersTask,
    setFoldersTask,
    editedNameProject,
    setEditedNameProject,
  } = useContextTaskData();

  const {
    open: isOpenModalCreateProject,
    onOpen: onOpenModalCreateProject,
    onClose: onCloseModalCreateProject,
  } = useDisclosure();

  const {
    open: isOpenModalEditProject,
    onOpen: onOpenModalEditProject,
    onClose: onCloseModalEditProject,
  } = useDisclosure();

  const router = useRouter();
  const { id, projectId } = router.query;

  function handleCreateTaskProject(projectName: string) {
    if (!id) {
      errorToast('Nenhuma pasta selecionada.');
      return;
    }

    const projectNameExists = listProjects.some(
      project => project.projectName === projectName
    );

    if (!projectName) {
      errorToast('Nome do projeto deve ter pelo menos 1 caractere.');
      return;
    }

    if (projectNameExists) {
      errorToast(`Projeto "${projectName}" já existe.`);
      return;
    }

    try {
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
      onCloseModalCreateProject();
      successToast('Projeto criado!');
    } catch (error) {
      errorToast('Erro ao criar projeto, tente novamente.');
      console.error('Erro ao criar projeto:', error);
    }
  }

  function validEditionProject() {
    const validEditedName =
      editedNameProject.trim().length > 0 && editedNameProject.length <= 30;

    const isProjectNameUnique = !foldersTask.some(folder =>
      folder.projects.some(project => project.projectName === editedNameProject)
    );

    if (!validEditedName) {
      errorToast('Nome do projeto deve ter entre 1 e 30 caracteres');
      return;
    }

    if (!isProjectNameUnique) {
      errorToast(`"${editedNameProject}" já existe`);
      return;
    }
  }

  function editProject(id: string | string[] | undefined) {
    validEditionProject();
    try {
      const updatedFolders = foldersTask.map(folder => ({
        ...folder,
        projects: folder.projects.map(project =>
          project.id === id
            ? { ...project, projectName: editedNameProject }
            : project
        ),
      }));

      setFoldersTask(updatedFolders);
      setEditedNameProject('');
      onCloseModalEditProject();

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Projeto editado com sucesso!');
      }
    } catch (error) {
      errorToast('Erro ao editar o projeto');
      console.error('Erro ao editar o projeto:', error);
    }
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
    deleteTaskProject,
    isOpenModalCreateProject,
    onOpenModalCreateProject,
    onCloseModalCreateProject,
    editProject,
    editedNameProject,
    setEditedNameProject,
    isOpenModalEditProject,
    onOpenModalEditProject,
    onCloseModalEditProject,
  };
}
