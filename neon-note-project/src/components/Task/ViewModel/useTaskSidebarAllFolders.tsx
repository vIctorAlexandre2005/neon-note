import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useDisclosure } from '@chakra-ui/react';
import { mockPastas, MockProps } from '@/utils/mockFolders';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from "uuid";

export function useTaskSidebarAllFolders() {
  const {
    isLoadingTaskFolder,
    setIsLoadingTaskFolder,
    newTaskFolderName,
    setNewTaskFolderName,
    tasksAllFolders,
    setAllTasksFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    openFixedFolders,
    setOpenFixedFolders,
    openNotFixedFolders,
    setOpenNotFixedFolders,
    tasksFixedFolders,
    setTasksFixedFolders,
    editedTaskFolderName,
    setEditedTaskFolderName,
    foldersTask,
    setFoldersTask,
  } = useContextTaskData();

  const {
    open: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  const {
    open: isOpenDeleteFolder,
    onOpen: onOpenDeleteFolder,
    onClose: onCloseDeleteFolder,
  } = useDisclosure();

  const router = useRouter();

  const [previousMockArrayLength, setPreviousMockArrayLength] = useState(
    foldersTask?.length
  );

  const {
    open: openModalEditNameFolder,
    onOpen: onOpenModalEditNameFolder,
    onClose: onCloseModalEditNameFolder,
  } = useDisclosure();

  useEffect(() => {
    if (foldersTask?.length < previousMockArrayLength) {
      router.replace('/tasksFolders');
    }
  }, [foldersTask]);

  async function getAllFoldersTask() {
    try {
      setIsLoadingTaskFolder(true);
      // Lê do localStorage primeiro para refletir atualizações locais
      const parsedFolders = localStorage.getItem('foldersTask');
      if (parsedFolders) {
        setFoldersTask(JSON.parse(parsedFolders));
      }
    } catch (error) {
      errorToast('Erro ao obter as pastas');
      console.error('Erro ao obter as pastas:', error);
    } finally {
      setIsLoadingTaskFolder(false);
    }
  }

  function handleAddFolderTask() {
    try {
      const isFolderNameValid =
        newTaskFolderName.trim().length > 0 && newTaskFolderName.length <= 30;
      const isFolderNameUnique = !foldersTask.some(
        folder => folder.folderName === newTaskFolderName
      );

      if (!isFolderNameValid) {
        errorToast('Nome da pasta deve ter entre 1 e 30 caracteres');
        return;
      }

      if (!isFolderNameUnique) {
        errorToast(`"${newTaskFolderName}" já existe`);
        return;
      }

      const newFolder: MockProps = {
        id: uuidv4(),
        folderName: newTaskFolderName,
        projects: [],
      };

      const newFolders = [...foldersTask, newFolder];

      setFoldersTask(newFolders);
      setNewTaskFolderName('');

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(newFolders));
        successToast('Pasta criada com sucesso!');
        onCloseAddFolder();
      }
    } catch (error) {
      errorToast('Erro ao criar a pasta');
      console.error('Erro ao criar a pasta:', error);
    }
  }

  function handleEditFolderTask(id: string | string[] | undefined) {
    const validEditedName =
      editedTaskFolderName.trim().length > 0 &&
      editedTaskFolderName.length <= 30;
    const isFolderNameUnique = !foldersTask.some(
      folder => folder.folderName === editedTaskFolderName
    );

    if (!validEditedName) {
      errorToast('Nome da pasta deve ter entre 1 e 30 caracteres');
      return;
    }

    if (!isFolderNameUnique) {
      errorToast(`"${editedTaskFolderName}" já existe`);
      return;
    }

    try {
      const folder = foldersTask.find(folder => folder.id === id);
      if (folder) {
        folder.folderName = editedTaskFolderName;
        setFoldersTask([...foldersTask]);
        setEditedTaskFolderName('');
        onCloseModalEditNameFolder();
      } else {
        errorToast('Pasta não encontrada');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(foldersTask));
        successToast('Pasta editada com sucesso!');
      }
    } catch (error) {
      errorToast('Erro ao editar a pasta');
      console.error('Erro ao editar a pasta:', error);
    }
  }

  function deleteFolderTask(id: string | string[] | undefined) {
    try {
      const updatedFolders = foldersTask.filter(folder => folder.id !== id);
      setFoldersTask(updatedFolders);
      setPreviousMockArrayLength(updatedFolders?.length); // Atualiza a contagem

      // Salva toda a estrutura atualizada no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta excluida!');
      }
      setTimeout(() => {
        router.replace('/tasksFolders');
      }, 200);
      setSelectedTaskFolder(null);
    } catch (error) {
      errorToast('Erro ao deletar a pasta');
      console.error('Erro ao deletar a pasta:', error);
    }
  }

  function handleOpenNotFixedFolders() {
    setOpenNotFixedFolders(!openNotFixedFolders);
  }

  function handleSelectFolderTask(id: string) {
    setSelectedTaskFolder(id);
  }

  useEffect(() => {
    getAllFoldersTask();
  }, [selectedTaskFolder]);

  return {
    newTaskFolderName,
    setNewTaskFolderName,

    isLoadingTaskFolder,
    setIsLoadingTaskFolder,

    tasksAllFolders,
    setAllTasksFolders,

    selectedTaskFolder,
    setSelectedTaskFolder,

    handleAddFolderTask,
    deleteFolderTask,
    handleSelectFolderTask,

    isOpenAddFolder,
    onOpenAddFolder,
    onCloseAddFolder,

    isOpenDeleteFolder,
    onOpenDeleteFolder,
    onCloseDeleteFolder,

    openFixedFolders,
    setOpenFixedFolders,

    openNotFixedFolders,
    setOpenNotFixedFolders,

    handleOpenNotFixedFolders,

    tasksFixedFolders,
    setTasksFixedFolders,
    foldersTask,
    handleEditFolderTask,

    editedTaskFolderName,
    setEditedTaskFolderName,

    openModalEditNameFolder,
    onOpenModalEditNameFolder,
    onCloseModalEditNameFolder,
  };
}
