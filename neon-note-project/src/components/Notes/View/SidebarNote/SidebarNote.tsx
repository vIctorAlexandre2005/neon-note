import { BiPlus } from 'react-icons/bi';
import FadeIn from '../../../common/Effects/FadeIn';
import { Fragment, useEffect, useState } from 'react';
import { truncateText } from '@/utils/truncate';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { CardNotes } from './cardNotes';
import { ButtonComponent } from '@/components/common/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaFolder, FaFolderOpen, FaFolderPlus } from 'react-icons/fa';
import { IoFolderOpenSharp } from 'react-icons/io5';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ModalComponent } from '@/components/Modals/modal';
import { BsTrash } from 'react-icons/bs';
import { HiDocumentText } from 'react-icons/hi2';
import { DrawerComponent } from '@/components/common/drawer';
import { DrawerSidebarNote } from './drawerFolders/drawerSidebarNote';
import { useSidebarCardsNote } from '../../ViewModel/useSidebarCardsNote';
import { useSecondarySidebarNote } from '../../ViewModel/useSecondarySidebarNote';

export function SidebarNote() {
  const { darkMode } = useContextGlobal();
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
    onOpen,
    searchNotes,
    loadingNotes,
    moveNote,
    filteredNotes,
  } = useSidebarCardsNote();

  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    newFolderName,
    handleAddFolder,
    setNewFolderName,
  } = useSecondarySidebarNote();

  const handleSelectNote = (note: any) => {
    setTitleNote(note.title);
    setTextNote(note.text);
    setActiveNote(note.id);
  };

  function handleSearchNotes(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchNotes(e.target.value);
  }

  const { selectedItem, handleItemClick, isOpenModal, onOpenModal, onCloseModal } = useContextNoteData();
  

  function handleAddNote(itemId: string) {
    if (!user || !user.uid) {
      return;
    }

    addNote({
      title: '',
      text: '',
      date: Date.now(),
      userId: user.uid,
      itemId,
    });
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
      className={`${darkMode ? 'bg-slate-900' : 'bg-white border border-gray-200'} w-full h-full xs:rounded-none md:rounded-xl p-2`}
    >
      <div className='flex justify-between items-center'>
        <h1
          className={`text-2xl mt-2 ${darkMode ? 'text-white text-opacity-80' : 'text-black-900'}`}
        >
          {selectedItem}
        </h1>
        <div className='flex gap-4 items-center'>
          <ButtonComponent
            onClick={() => {
              onOpenModal();
            }}
            isLoading={loading}
            icon={<IoFolderOpenSharp color='white' size={24} />}
            className='bg-neon-400 hover:bg-neon-500 rounded-full xs:flex md:hidden'
          />
          <ButtonComponent
            onClick={() => handleAddNote(selectedFolderId as string)}
            isLoading={loading}
            icon={<BiPlus color='white' size={24} />}
            loader={<ClipLoader color='white' size={24} />}
            disabled={loading}
            className='bg-neon-400 hover:bg-neon-500 rounded-full'
          />
        </div>
      </div>
      <div className='flex flex-col mt-3'>
        <p
          className={`mt-3 text-sm ${darkMode ? 'text-white' : 'text-black-900'} opacity-60`}
        >
          Total de anotações:{' '}
          {selectedFolderId === 1
            ? noteList?.length
            : noteList?.filter(note => note.itemId === selectedFolderId)?.length}
        </p>
      </div>
      <div className='flex flex-col mt-3 gap-4 overflow-auto max-h-[calc(100vh-240px)]'>
        {' '}
        {/*  */}
        {loadingNotes && (
          <div className='flex justify-center items-center mt-24'>
            <PulseLoader color='#004aff' size={24} />
          </div>
        )}
        {!loadingNotes && (
          <DndProvider backend={HTML5Backend}>
            {noteList?.map((note: any, index: number) => (
              <CardNotes
                activeNote={activeNote}
                key={index}
                note={note}
                handleSelectNote={handleSelectNote}
                onOpen={onOpen}
                darkMode={darkMode}
                moveNote={moveNote}
                index={index}
              />
            ))}
          </DndProvider>
        )}
      </div>
      {isOpenModal && (
        <DrawerSidebarNote
          folders={folders}
          onCloseModal={onCloseModal}
          selectedFolderId={selectedFolderId}
          selectedItem={selectedItem}
          setSelectedFolderId={setSelectedFolderId}
          handleItemClick={handleItemClick}
          isOpenModal={isOpenModal}
          handleAddFolder={handleAddFolder}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
        />
      )}
    </div>
  );
}
