import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { useState } from 'react';

export function useSidebarNote() {
  const {
    addNote,
    noteList,
    setTitleNote,
    setTextNote,
    activeNote,
    setActiveNote,
    onOpen,
    loading,
    textNote,
    titleNote,
    loadingNotes,
  } = useContextNoteData();

  const { user, selectedItem } = useContextGlobal();

  const [searchNotes, setSearchNotes] = useState('');

  function notesWithId(array: any[], search: string, name?: string) {
    return array
      .filter(note => {
        const matchesSearch = 
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.text.toLowerCase().includes(search.toLowerCase());
        const matchesFolder = note.folderId === name;
        return matchesSearch && matchesFolder;
      })
      .sort((a, b) => b.date - a.date); // Retorna todas as notas correspondentes
  }

  function allNotes(array: any[], search: string) {
    return array
      .filter(note => {
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.text.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) => b.date - a.date); // Retorna todas as notas correspondentes
  }

  const filteredNotes = selectedItem === 'All notes' ?  allNotes(noteList, searchNotes) : notesWithId(noteList, searchNotes, selectedItem);

  console.log(filteredNotes);

  return {
    addNote,
    noteList,
    setTitleNote,
    setTextNote,
    activeNote,
    setActiveNote,
    onOpen,
    loading,
    textNote,
    titleNote,
    searchNotes,
    setSearchNotes,
    filteredNotes,
    user,
    loadingNotes,
  };
}
