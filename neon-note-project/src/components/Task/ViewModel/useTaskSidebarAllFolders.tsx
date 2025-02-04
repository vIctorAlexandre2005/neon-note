import { errorToast, successToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';
import { useDisclosure } from '@chakra-ui/react';
import { mockPastas, MockProps } from '@/utils/mockFolders';

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

  const [mockArray, setMockArray] = useState<MockProps[]>(mockPastas);

  function handleAddFolderTask() {
    const folderExist = mockArray.some(folder => folder.folderName === newTaskFolderName);
  
    if (folderExist) {
      errorToast(`"${newTaskFolderName}" já existe`);
      return;
    }
  
    if (newTaskFolderName.trim()) {

      const newId = mockArray?.length + 1;

      const newFolder = {
        id: newId.toString(), // Mantém o padrão de ID como string
        folderName: newTaskFolderName,
        projects: [
          {
            id: '1',
            projectName: 'Projeto 1',
          }
        ], // Garante que a estrutura é a mesma
      };

      console.log(newFolder);
  
      const updatedFolders = [...mockArray, newFolder];
      setMockArray(updatedFolders as any); // O "as any" não é necessário
  
      setNewTaskFolderName(''); // Limpa o campo de input
  
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta criada com sucesso!');
      }
    } else {
      errorToast('Nome da pasta não pode estar vazio!');
    }
  }  

  function handleSelectFolderTask(id: number) {
    setSelectedTaskFolder(id);
  }

  function deleteFolderTask(id: string) {
    const updatedFolders = mockArray.filter(folder => folder.id !== id);
    setMockArray(updatedFolders);

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
        setMockArray(JSON.parse(parsedFolders));
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
    mockArray
  };
}
