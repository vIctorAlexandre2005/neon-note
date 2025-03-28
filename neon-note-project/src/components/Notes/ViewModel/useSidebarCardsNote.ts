import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useEffect, useState } from 'react';

export function useSidebarCardsNote() {
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
    selectedItem, 
    selectedFolderId,
  } = useContextNoteData();

  const { user } = useContextGlobal();
  const [searchNotes, setSearchNotes] = useState('');

  function notesWithId(array: any[], search: string, folderId?: string) {
    return array
      .filter(note => {
        const matchesSearch =
          note.folderId = note.folderId === selectedItem &&
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.text.toLowerCase().includes(search.toLowerCase());
        const matchesFolder = note.folderId === folderId;
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

      const filtered =
        selectedFolderId === 1
          ? allNotes(noteList, searchNotes)
          : notesWithId(noteList, searchNotes, selectedFolderId as string);

      setNoteList(filtered);
    }

    // Seleciona todas as notas ou as notas com o folderId específico


  }, [searchNotes, selectedItem]);

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
