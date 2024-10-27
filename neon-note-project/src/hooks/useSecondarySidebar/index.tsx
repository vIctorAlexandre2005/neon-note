import { errorToast } from '@/utils/toasts/toasts';
import { useEffect, useState } from 'react';

interface Folder {
  id: number;
  name: string;
  items: string[];
}

export function useSecondarySidebar() {
  const [openSubFolder, setOpenSubFolder] = useState<null | number>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  function openSubFolders(id: number) {
    setOpenSubFolder(prev => {
      if (prev === id) {
        return null;
      } else {
        return id;
      }
    });
  }

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
        items: [],
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
  
  const handleAddItem = () => {

    const existItemName = folders.some(folder => folder.items.some(item => item === newItemName));

    if(existItemName) {
      errorToast(`"${newItemName}" já existe em sua pasta!`);
      return;
    }

    if (selectedFolderId && newItemName.trim()) {
      const updatedFolders = folders.map(folder =>
        folder.id === selectedFolderId ? { ...folder, items: [...folder.items, newItemName] } : folder
      );
  
      setFolders(updatedFolders);
      setNewItemName(''); // Limpa o campo de input
  
      // Salva toda a estrutura atualizada no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
      }
    } else {
      errorToast('Nome da item não pode ser vazio!');
      return;
    }
  };

  useEffect(() => {
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);
  

  return {
    openSubFolder,
    setOpenSubFolder,
    folders,
    newFolderName,
    newItemName,
    selectedFolderId,
    setSelectedFolderId,
    openSubFolders,
    handleAddFolder,
    handleAddItem,
    setNewFolderName,
    setNewItemName,
  }
}
