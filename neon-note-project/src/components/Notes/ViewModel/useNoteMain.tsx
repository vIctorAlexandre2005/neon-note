import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '../Context/NoteContext';
import { useState } from 'react';
import { debounce } from '@/utils/debounce';
import { db } from '@/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function useNoteMain() {
  const {
    setTitleNote,
    setTextNote,
    noteList,
    updateNote,
    deleteNote,
    titleNote,
    textNote,
    activeNote,
    isOpen,
    selectedFolderId,
    setSelectedFolderId,
    onClose,
    selectedItem
  } = useContextNoteData();

  const { isMobile, user, darkMode } = useContextGlobal();

  const activeNoteId = noteList.find(note => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const debouncedUpdateNote = debounce(
    async (id: string, updatedFields: any) => {
      setSaving(true);
      try {
        const noteRef = doc(
          db,
          `users/${user?.uid}/folders/${selectedFolderId}/notes/${id}`
        );
        const sanitizedFields: any = Object.fromEntries(
          Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
        );
        await updateDoc(noteRef, sanitizedFields);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error('Erro ao atualizar a nota:', error);
      } finally {
        setSaving(false);
      }
    },
    500
  );

  // Funções de handle para capturar as mudanças nos inputs
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitleNote(newTitle);
    debouncedUpdateNote(activeNote, { title: newTitle }); // Atualiza no Firebase
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTextNote(newText);
    debouncedUpdateNote(activeNote, { text: newText }); // Atualiza no Firebase
  };

  return {
    setTitleNote,
    setTextNote,
    noteList,
    updateNote,
    deleteNote,
    titleNote,
    textNote,
    activeNote,
    isOpen,
    selectedFolderId,
    setSelectedFolderId,
    onClose,
    isMobile, user, darkMode,
    activeNoteId,
    saving, setSaving,
    saved, setSaved,
    debouncedUpdateNote,
    handleTitleChange,
    handleTextChange,
    selectedItem
  };
}
