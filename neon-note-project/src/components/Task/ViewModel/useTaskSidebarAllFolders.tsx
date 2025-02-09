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

  const [mockArray, setMockArray] = useState<MockProps[]>(mockPastas);
  const [previousMockArrayLength, setPreviousMockArrayLength] = useState(mockArray?.length);


  useEffect(() => {
    if (mockArray?.length < previousMockArrayLength) {
      router.replace('/tasks');
    };
  }, [mockArray]);

  function handleAddFolderTask() {
    const folderExist = mockArray.some(
      folder => folder.folderName === newTaskFolderName
    );

    if (folderExist) {
      errorToast(`"${newTaskFolderName}" já existe`);
      return;
    }

    if (newTaskFolderName.trim()) {
      const newId = mockArray?.length;

      const newFolder = {
        id: newId.toString(),
        folderName: newTaskFolderName,
        projects: [
          {
            id: '1',
            projectName: 'Projeto 1',
          },
        ],
      };

      const updatedFolders = [...mockArray, newFolder];
      setMockArray(updatedFolders as any);
      setNewTaskFolderName('');

      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta criada com sucesso!');
      }
    } else {
      errorToast('Nome da pasta não pode estar vazio!');
    };
  };

  function handleSelectFolderTask(id: string) {
    setSelectedTaskFolder(id);
  };

  function deleteFolderTask(id: string | string[] | undefined) {
    
    try {
      const updatedFolders = mockArray.filter(folder => folder.id !== id);
      setMockArray(updatedFolders);
      setPreviousMockArrayLength(updatedFolders?.length); // Atualiza a contagem

      // Salva toda a estrutura atualizada no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('foldersTask', JSON.stringify(updatedFolders));
        successToast('Pasta excluida!');
      };
      setTimeout(() => {
        router.replace('/tasks');
      }, 200);
      setSelectedTaskFolder(null);
    } catch (error) {
      errorToast('Erro ao deletar a pasta');
      console.error('Erro ao deletar a pasta:', error);
    };
  };

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
          folder => folder.id.toString() === selectedTaskFolder
        );
        if (folder) {
          const updatedFolders = tasksAllFolders.filter(
            folder => folder.id.toString() !== selectedTaskFolder
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
    mockArray,
  };
};
