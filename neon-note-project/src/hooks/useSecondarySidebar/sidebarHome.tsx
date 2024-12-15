import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { db } from '@/services/firebase';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Folder {
  id: number;
  name: string;
  userId: string;
};

export function useSecondarySidebarHome() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');

  const { user } = useContextGlobal();
  const { 
    selectedItem, 
    handleItemClick, 
    selectedFolderId, 
    setSelectedFolderId 
  } = useContextNoteData();
  
  const folderExist = folders.some(folder => folder.name === newFolderName);

  async function handleAddFolder() {
    if (folderExist) {
      errorToast(`A pasta "${newFolderName}" já existe`);
      return;
    };

    const newFolder = {
      name: newFolderName,
      userId: user?.uid
    };

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/folders`), newFolder);
      const updatedFolders: any = [...folders, { id: docRef.id, ...newFolder }];

      setNewFolderName('');
      setFolders(updatedFolders);

      // Salva toda a estrutura atualizada no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
      }

    } catch (error) {
      errorToast('Erro ao adicionar a pasta');
      console.error('Erro ao adicionar a pasta:', error);
    }
  }

  async function deleteFolder(id: string) {
    try {
      // Atualiza o estado local imediatamente
      setFolders(prevFolders => {
        const updatedFolders = prevFolders.filter(folder => folder.id !== Number(id));
        if (typeof window !== 'undefined') {
          localStorage.setItem('folders', JSON.stringify(updatedFolders));
        }
        return updatedFolders;
      });
      
      // Exclui a pasta do Firestore
      const notesAndFoldersDeleted = doc(db, `users/${user.uid}/folders${id}/notes`);
      await deleteDoc(notesAndFoldersDeleted);
  
      if (typeof window !== 'undefined') {
        window.location.reload();
      };
  
      // Limpa a pasta selecionada, se for a excluída
      setSelectedFolderId((prevId: any) => (prevId === id ? null : prevId));
    } catch (error) {
      errorToast('Erro ao deletar a pasta');
      console.error('Erro ao deletar a pasta:', error);
    }
  }

  useEffect(() => {
    async function getFoldersNote() {
      try {
        // Lê do localStorage primeiro para refletir atualizações locais
        const parsedFolders = localStorage.getItem('folders');
        if (parsedFolders) {
          setFolders(JSON.parse(parsedFolders));
        }
  
        // Em seguida, sincroniza com o Firestore
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/folders`));
        const foldersNotesArray: any = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setFolders(foldersNotesArray);
      } catch (error) {
        console.error('Erro ao obter as pastas:', error);
      };
    };
  
    getFoldersNote();
  }, [selectedItem]);
  
  return {
    folders,
    newFolderName,
    selectedFolderId,
    setSelectedFolderId,
    handleAddFolder,
    setNewFolderName,
    deleteFolder,
    handleItemClick,
    selectedItem
  }
}
