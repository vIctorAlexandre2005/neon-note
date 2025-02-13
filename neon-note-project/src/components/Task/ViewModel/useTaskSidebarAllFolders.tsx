import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useDisclosure } from '@chakra-ui/react';
import { mockPastas, MockProps } from '@/utils/mockFolders';
import { useRouter } from 'next/router';

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
    mockArray,
    setMockArray,
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
    mockArray?.length
  );

  const {
    open: openModalEditNameFolder,
    onOpen: onOpenModalEditNameFolder,
    onClose: onCloseModalEditNameFolder,
  } = useDisclosure();

  useEffect(() => {
    if (mockArray?.length < previousMockArrayLength) {
      router.replace('/tasks');
    }
  }, [mockArray]);

  async function getAllFoldersTask() {
    try {
      setIsLoadingTaskFolder(true);
      // Lê do localStorage primeiro para refletir atualizações locais
      const parsedFolders = localStorage.getItem('foldersTask');
      if (parsedFolders) {
        setMockArray(JSON.parse(parsedFolders));
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
      const isFolderNameUnique = !mockArray.some(
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
        id: (mockArray.length + 1).toString(),
        folderName: newTaskFolderName,
        projects: [],
      };

      setMockArray([...mockArray, newFolder]);
      setNewTaskFolderName('');

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'foldersTask',
          JSON.stringify([...mockArray, newFolder])
        );
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
    const isFolderNameUnique = !mockArray.some(
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
      const folder = mockArray.find(folder => folder.id === id);
      if (folder) {
        folder.folderName = editedTaskFolderName;
        setMockArray([...mockArray]);
        setEditedTaskFolderName('');
        onCloseModalEditNameFolder();
      } else {
        errorToast('Pasta não encontrada');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(mockArray));
        successToast('Pasta editada com sucesso!');
      }
    } catch (error) {
      errorToast('Erro ao editar a pasta');
      console.error('Erro ao editar a pasta:', error);
    }
  }

  function deleteFolderTask(id: string | string[] | undefined) {
    try {
      const updatedFolders = mockArray.filter(folder => folder.id !== id);
      setMockArray(updatedFolders);
      setPreviousMockArrayLength(updatedFolders?.length); // Atualiza a contagem

      // Salva toda a estrutura atualizada no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta excluida!');
      }
      setTimeout(() => {
        router.replace('/tasks');
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
    mockArray,
    handleEditFolderTask,

    editedTaskFolderName,
    setEditedTaskFolderName,

    openModalEditNameFolder,
    onOpenModalEditNameFolder,
    onCloseModalEditNameFolder,
  };
}
