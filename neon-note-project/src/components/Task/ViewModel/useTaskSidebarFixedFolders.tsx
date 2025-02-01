import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useDisclosure } from '@chakra-ui/react';

export function useTaskSidebarFixedFolders() {
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

  function handleAddFolderTask() {
    const folderExist = tasksAllFolders.some(
      folder => folder.name === newTaskFolderName
    );

    if (folderExist) {
      errorToast(`"${newTaskFolderName}" já existe`);
      return;
    }

    if (newTaskFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newTaskFolderName,
      };

      const updatedFolders = [...tasksAllFolders, newFolder];
      setAllTasksFolders(updatedFolders);
      setNewTaskFolderName(''); // Limpa o campo de input

      // Salva toda a estrutura no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta criada com sucesso!');
      }
    } else {
      errorToast('Nome da pasta não pode estar vazio!');
      return;
    }
  }

  function handleSelectFolderTask(id: number, nameFolder: string) {
    setSelectedTaskFolder(id);
    setNewTaskFolderName(nameFolder);
  }

  function deleteFolderTask(id: number) {
    const updatedFolders = tasksAllFolders.filter(folder => folder.id !== id);
    setAllTasksFolders(updatedFolders);

    // Salva toda a estrutura atualizada no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
    }
  }

  function handleOpenNotFixedFolders() {
    setOpenNotFixedFolders(!openNotFixedFolders);
  }

  function handleOpenFixedFolders() {
    setOpenFixedFolders(!openFixedFolders);
  }

  async function getAllFoldersTask() {
    try {
      setIsLoadingTaskFolder(true);
      // Lê do localStorage primeiro para refletir atualizações locais
      const parsedFolders = localStorage.getItem('foldersTask');
      if (parsedFolders) {
        setAllTasksFolders(JSON.parse(parsedFolders));
      }
    } catch (error) {
      errorToast('Erro ao obter as pastas');
      console.error('Erro ao obter as pastas:', error);
    } finally {
      setIsLoadingTaskFolder(false);
    }
  }

  async function getFolderTaskFixed() {
    try {
      setIsLoadingTaskFolder(true);
      // Lê do localStorage primeiro para refletir atualizações locais
      const parsedFolders = localStorage.getItem('foldersTaskFixed');
      if (parsedFolders) {
        setTasksFixedFolders(JSON.parse(parsedFolders));
      }
    } catch (error) {
      errorToast('Erro ao obter as pastas');
      console.error('Erro ao obter as pastas:', error);
    } finally {
      setIsLoadingTaskFolder(false);
    }
  }

  function handleFixedFolder() {
    try {
      if (selectedTaskFolder) {
        const folder = tasksAllFolders.find(
          folder => folder.id === selectedTaskFolder
        );
        if (folder) {
          const updatedFolders = tasksAllFolders.filter(
            folder => folder.id !== selectedTaskFolder
          );
          setAllTasksFolders(updatedFolders);
          setTasksFixedFolders(prevFolders => [...prevFolders, folder]);
          successToast('Pasta fixada com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao fixar a pasta:', error);
      errorToast('Erro ao fixar a pasta, tente novamente.');
    }
  }

  useEffect(() => {
    getFolderTaskFixed();
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
    handleOpenFixedFolders,

    tasksFixedFolders,
    setTasksFixedFolders,

    handleFixedFolder,
  };
}
