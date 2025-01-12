import { NoteMain } from './InputsNote/NoteMain';
import { useEffect, useState } from 'react';
import { BiArrowBack, BiCheck, BiDotsVertical, BiTrash } from 'react-icons/bi';
import { InputComponent } from '../../common/InputField';
import { debounce } from '@/utils/debounce';
import { db } from '@/services/firebase';
import FadeIn from '../../common/Effects/FadeIn';
import { DrawerToUseNote } from './DrawerOpenSelectedNote/DrawerToUseNote';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
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

        {isOpen &&
          isMobile && ( // abre modal apenas no mobile
            <DrawerToUseNote
              isOpen={isOpen}
              onClose={onClose}
              activeNoteId={activeNoteId}
              titleNote={titleNote}
              textNote={textNote}
              darkMode={darkMode}
              deleteNote={deleteNote}
              saved={saved}
              saving={saving}
              updateNote={updateNote}
              handleTextChange={handleTextChange}
              handleTitleChange={handleTitleChange}
            />
          )}
      </div>
    );
  }
}
