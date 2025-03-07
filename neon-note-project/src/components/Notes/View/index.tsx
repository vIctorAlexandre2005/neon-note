import { useEffect, useState } from 'react';
import { SidebarNote } from './SidebarNote/SidebarNote';
import { ContainerSidebarAndNoteMain } from './SidebarNote/ContainerSidebarAndNoteMain';
import { ThereIsNoFolderMobile } from '@/components/common/ThereIsNoFolderMobile';
import { useNoteMain } from '../ViewModel/useNoteMain';

export function NeonNote() {
  const {
    activeNoteId,
    activeNote,
    noteList,
    darkMode,
    deleteNote,
    handleTextChange,
    handleTitleChange,
    titleNote,
    textNote,
    selectedItem,
    isMobile,
    isOpen,
    onClose,
    saved,
    saving,
    selectedFolderId,
    setTitleNote,
    setTextNote,
    updateNote,
  } = useNoteMain();

  useEffect(() => {
    if (activeNoteId) {
      setTitleNote(activeNoteId.title);
      setTextNote(activeNoteId.text);
    }
  }, [activeNote, noteList]);

  if (!isMobile && !selectedItem) {
    return (
      <div className='flex flex-col justify-end items-center animate-flute'>
        <img
          src='/noFolders.svg'
          alt='empty'
          className='object-cover mt-24'
          height={300}
          width={300}
        />
        <h3
          className={`${darkMode ? 'text-white' : 'text-black'} text-xl mt-5`}
        >
          Crie e inspire-se!
        </h3>
      </div>
    );
  }

  if (selectedItem && !isMobile) {
    return (
      <ContainerSidebarAndNoteMain
        activeNote={activeNote}
        darkMode={darkMode}
      />
    );
  }

  if (isMobile) {
    return (
      <div className='flex h-full justify-center gap-4'>
        {selectedFolderId ? (
          <div className='md:flex-none xs:w-full md:w-80 max-h-full'>
            <SidebarNote />
          </div>
        ) : (
          <ThereIsNoFolderMobile />
        )}
      </div>
    );
  }
}
