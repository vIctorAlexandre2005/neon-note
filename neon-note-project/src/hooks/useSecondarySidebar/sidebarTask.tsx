import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { errorToast } from '@/utils/toasts/toasts';
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
  const [selectedFolderId, setSelectedFolderId] = useState<number | null | string>(null);

  const { user } = useContextGlobal();
  const {selectedItem, setSelectedItem } = useContextNoteData();

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
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
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
    // handleDeleteItem
  }
}
