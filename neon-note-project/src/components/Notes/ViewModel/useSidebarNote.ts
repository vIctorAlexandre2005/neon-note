import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { useEffect, useState } from 'react';

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
    setNoteList,
    loadingNotes,
    filteredNotes,
    setFilteredNotes,
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
      .sort((a, b) => {
        const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
  
        if (dateComparison === 0) {
          return a.position - b.position;
        };
  
        return dateComparison;
      });
  };

  function allNotes(array: any[], search: string) {
    return array
      .filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
  
        if (dateComparison === 0) {
          return a.position - b.position;
        };
  
        return dateComparison;
      });
  };
  

  function moveNote(fromIndex: any, toIndex: any) {
    const updatedNotes = Array.from(noteList);
    const [movedNote] = updatedNotes.splice(fromIndex, 1);
    updatedNotes.splice(toIndex, 0, movedNote);
    setNoteList(updatedNotes);

    if (typeof window !== 'undefined') {
      localStorage.setItem('listNotes', JSON.stringify(updatedNotes));
    };
  };

  useEffect(() => {
    const listNotes = localStorage.getItem('listNotes');
  
    if (listNotes) {
      setNoteList(JSON.parse(listNotes));
    } else {
      // Seleciona todas as notas ou as notas com o folderId específico
      const filtered =
        selectedItem === 'All notes'
          ? allNotes(noteList, searchNotes)
          : notesWithId(noteList, searchNotes, selectedItem as string);
  
      setNoteList(filtered);
    }
  }, [noteList, searchNotes, selectedItem]);

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
    moveNote,
    setFilteredNotes,
  };
}
