import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { db } from '@/services/firebase';
import { errorToast } from '@/utils/toasts/toasts';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useContextTaskData } from '../Context/TaskContext/TaskContext';

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
  } = useContextTaskData();

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
      }
    } else {
      errorToast('Nome da pasta não pode estar vazio!');
      return;
    }
  }

  function deleteFolderTask(id: number) {
    const updatedFolders = tasksFolders.filter(folder => folder.id !== id);
    setTasksFolders(updatedFolders);

    // Salva toda a estrutura atualizada no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
    }
  }

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
    isLoadingTaskFolder,
    setIsLoadingTaskFolder,
    newTaskFolderName,
    setNewTaskFolderName,
    tasksFolders,
    setTasksFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    handleAddFolderTask,
    deleteFolderTask,
  };
}
