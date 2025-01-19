import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useDisclosure } from '@chakra-ui/react';

export function useSecondarySidebarTask() {

  const {
    isLoadingTaskFolder,
    setIsLoadingTaskFolder,
    newTaskFolderName,
    setNewTaskFolderName,
    tasksFolders,
    setTasksFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    openFixedFolders,
    setOpenFixedFolders,
    openNotFixedFolders,
    setOpenNotFixedFolders
  } = useContextTaskData();

  const {
    isOpen: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteFolder,
    onOpen: onOpenDeleteFolder,
    onClose: onCloseDeleteFolder,
  } = useDisclosure();

  function handleAddFolderTask() {
    const folderExist = tasksFolders.some(
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

      const updatedFolders = [...tasksFolders, newFolder];
      setTasksFolders(updatedFolders);
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
    const updatedFolders = tasksFolders.filter(folder => folder.id !== id);
    setTasksFolders(updatedFolders);

    // Salva toda a estrutura atualizada no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
    }
  };

  function handleOpenNotFixedFolders() {
    setOpenNotFixedFolders(!openNotFixedFolders);
  };

  function handleOpenFixedFolders() {
    setOpenFixedFolders(!openFixedFolders);
  };

  useEffect(() => {
    async function getFoldersNote() {
      try {
        setIsLoadingTaskFolder(true);
        // Lê do localStorage primeiro para refletir atualizações locais
        const parsedFolders = localStorage.getItem('foldersTask');
        if (parsedFolders) {
          setTasksFolders(JSON.parse(parsedFolders));
        }
      } catch (error) {
        errorToast('Erro ao obter as pastas');
        console.error('Erro ao obter as pastas:', error);
      } finally {
        setIsLoadingTaskFolder(false);
      }
    }

    getFoldersNote();
  }, [selectedTaskFolder]);

  return {
    newTaskFolderName,
    setNewTaskFolderName,

    isLoadingTaskFolder,
    setIsLoadingTaskFolder,
    
    tasksFolders,
    setTasksFolders,
    
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
    handleOpenFixedFolders
  };
}
