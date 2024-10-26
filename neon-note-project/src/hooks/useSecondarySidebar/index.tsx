import { useState } from 'react';

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
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        items: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName(''); // Resetar o campo de input
    }
  };

  const handleAddItem = () => {
    if (selectedFolderId && newItemName.trim()) {
      setFolders(
        folders.map(folder =>
          folder.id === selectedFolderId
            ? { ...folder, items: [...folder.items, newItemName] }
            : folder
        )
      );
      setNewItemName(''); // Resetar o campo de input
    }
  };

  

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
