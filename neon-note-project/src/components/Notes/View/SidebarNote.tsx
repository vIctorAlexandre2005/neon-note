import { BiPlus } from 'react-icons/bi';
import { useTheme } from '../../ThemeDark';
import FadeIn from '../../Effects/FadeIn';
import { Fragment, useEffect, useState } from 'react';
import { truncateText } from '@/utils/truncate';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { useSidebarNote } from '../ViewModel/useSidebarNote';
import { CardNotes } from './cardNotes';
import { ButtonComponent } from '@/components/common/Button';

export function SidebarNote() {
  const { darkMode } = useTheme();

  const {
    noteList,
    addNote,
    titleNote,
    setTitleNote,
    textNote,
    setTextNote,
    activeNote,
    setActiveNote,
    setSearchNotes,
    loading,
    user,
    filteredNotes,
    onOpen,
    searchNotes,
    loadingNotes,
  } = useSidebarNote();

  const handleSelectNote = (note: any) => {
    setTitleNote(note.title);
    setTextNote(note.text);
    setActiveNote(note.id);
  };

  function handleSearchNotes(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchNotes(e.target.value);
  }

  function handleAddNote() {
    if (!user || !user.uid) {
      return;
    }

    addNote({ title: '', text: '', date: Date.now(), userId: user.uid });
  }

  useEffect(() => {
    if (activeNote) {
      const updatedNoteIndex = noteList.findIndex(
        note => note.id === activeNote
      );
      if (updatedNoteIndex !== -1) {
        const updatedNote = {
          ...noteList[updatedNoteIndex],
          title: titleNote,
          text: textNote,
        };
        noteList[updatedNoteIndex] = updatedNote;
      }
    }
  }, [titleNote, textNote, activeNote, noteList]);

  return (
    <div
      className={`${darkMode ? 'bg-slate-900' : 'bg-neon-50 border-2 shadow-lg'} max-h-96 overflow-auto w-full rounded-xl min-h-full p-2`}
    >
      <h1
        className={`text-2xl mt-2 ${darkMode ? 'text-white text-opacity-80' : 'text-black-900'}`}
      >
        Todas as anotações
      </h1>
      <div className='flex flex-col mt-3'>
        <div className='flex gap-1 items-center'>
          <input
            type='search'
            value={searchNotes}
            onChange={handleSearchNotes}
            placeholder='Pesquisar anotações'
            className={`w-full rounded-full ${darkMode ? 'placeholder:text-white' : 'placeholder:text-black-900'} ${darkMode ? 'text-white' : 'text-black-900'} text-opacity-80 placeholder:opacity-30 p-2 focus:outline-none ${darkMode ? 'bg-opacity-5' : 'bg-opacity-70'} bg-white`}
          />
          <div>
            <ButtonComponent
              onClick={() => handleAddNote()}
              isLoading={loading}
              icon={<BiPlus color='white' size={24} />}
              loader={<ClipLoader color='white' size={24} />}
              disabled={loading}
              className='bg-neon-500 hover:bg-neon-600 rounded-full'
            />
          </div>
        </div>
        <p
          className={`mt-3 text-sm ${darkMode ? 'text-white' : 'text-black-900'} opacity-60`}
        >
          Total de anotações: {noteList.length}
        </p>
      </div>
      <div className='flex flex-col mt-3 gap-4'>
        {loadingNotes && (
          <div className='flex justify-center items-center mt-24'>
            <PulseLoader color='#004aff' size={24} />
          </div>
        )}

        {!loadingNotes && (
          <>
            <CardNotes
              activeNote={activeNote}
              darkMode={darkMode}
              filteredNotes={filteredNotes}
              handleSelectNote={handleSelectNote}
              onOpen={onOpen}
            />
          </>
        )}
      </div>
    </div>
  );
}
