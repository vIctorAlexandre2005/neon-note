import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { db } from '@/services/firebase';
import { errorToast } from '@/utils/toasts/toasts';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Folder {
  id: number;
  name: string;
}

export function useSecondarySidebarTask() {
  const [openSubFolder, setOpenSubFolder] = useState<null | number>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  // const [newItemName, setNewItemName] = useState('');
  

  const { user } = useContextGlobal();
  const {selectedItem, selectedFolderId, setSelectedFolderId, loadingFolders, setLoadingFolders } = useContextNoteData();

  const handleAddFolder = () => {

    const folderExist = folders.some(folder => folder.name === newFolderName);

    if(folderExist) {
      errorToast(`"${newFolderName}" já existe`);
      return;
    };

    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
      };
  
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      setNewFolderName(''); // Limpa o campo de input
  
      // Salva toda a estrutura no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
      }
    } else {
      errorToast('Nome da pasta não pode ser vazio!');
      return;
    };
  };

  function deleteFolder(id: number) {
    const updatedFolders = folders.filter(folder => folder.id !== id);
    setFolders(updatedFolders);

    // Salva toda a estrutura atualizada no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
    }
  }

  useEffect(() => {
    async function getFoldersNote() {
      try {

        setLoadingFolders(true);
  
        // Em seguida, sincroniza com o Firestore
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/folders`));
        const foldersNotesArray: any = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setFolders(foldersNotesArray);
      } catch (error) {
        console.error('Erro ao obter as pastas:', error);
      } finally {
        setLoadingFolders(false);
      };
    };
  
    getFoldersNote();
  }, [selectedItem]);
  

  return {
    // openSubFolder,
    // setOpenSubFolder,
    folders,
    newFolderName,
    // newItemName,
    selectedFolderId,
    setSelectedFolderId,
    // openSubFolders,
    handleAddFolder,
    // handleAddItem,
    setNewFolderName,
    // setNewItemName,
    deleteFolder,
    // handleDeleteItem,
    loadingFolders,
    setLoadingFolders
  }
}
