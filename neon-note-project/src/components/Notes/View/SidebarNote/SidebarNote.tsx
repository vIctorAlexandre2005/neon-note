import { BiPlus } from 'react-icons/bi';
import { useTheme } from '../../../ThemeDark';
import FadeIn from '../../../Effects/FadeIn';
import { Fragment, useEffect, useState } from 'react';
import { truncateText } from '@/utils/truncate';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { CardNotes } from './cardNotes';
import { ButtonComponent } from '@/components/common/Button';
import { useSecondarySidebarHome } from '@/hooks/useSecondarySidebar/sidebarHome';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSidebarNote } from '../../ViewModel/useSidebarNote';
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
import { DrawerSidebarNote } from './drawer/drawerSidebarNote';

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
    onOpen,
    searchNotes,
    loadingNotes,
    moveNote,
    filteredNotes,
  } = useSidebarNote();

  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    newFolderName,
    handleAddFolder,
    setNewFolderName,
  } = useSecondarySidebarHome();

  const handleSelectNote = (note: any) => {
    setTitleNote(note.title);
    setTextNote(note.text);
    setActiveNote(note.id);
  };

  function handleSearchNotes(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchNotes(e.target.value);
  }

  const { selectedItem, handleItemClick } = useContextGlobal();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

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
            className='bg-neon-400 hover:bg-neon-500 rounded-full'
          />
          <ButtonComponent
            onClick={() => handleAddNote(selectedItem as string)}
            isLoading={loading}
            icon={<BiPlus color='white' size={24} />}
            loader={<ClipLoader color='white' size={24} />}
            disabled={loading}
            className='bg-neon-400 hover:bg-neon-500 rounded-full'
          />
        </div>
      </div>
      <div className='flex flex-col mt-3'>
        <div className='flex gap-1 items-center'>
          {/* <input
            type='search'
            value={searchNotes}
            onChange={handleSearchNotes}
            placeholder='Pesquisar anotações'
            className={`
              w-full rounded-full duration-200 text-opacity-80 placeholder:opacity-30 p-2 focus:outline-none bg-white
              ${
                darkMode
                  ? 'placeholder:text-white focus:border-2 focus:border-slate-700'
                  : 'placeholder:text-black-900 bg-gray-200 border border-gray-300 focus:border-gray-400'
              } 
                ${darkMode ? 'text-white' : 'text-black-900'} 
                ${darkMode ? 'bg-opacity-5' : 'bg-opacity-70'}
            `}
          /> */}
          <div className=''>
            {/* <ButtonComponent
              onClick={() => handleAddNote(selectedItem as string)}
              isLoading={loading}
              icon={<BiPlus color='white' size={24} />}
              loader={<ClipLoader color='white' size={24} />}
              disabled={loading}
              className='bg-neon-400 hover:bg-neon-500 rounded-full'
            /> */}
          </div>
        </div>
        <p
          className={`mt-3 text-sm ${darkMode ? 'text-white' : 'text-black-900'} opacity-60`}
        >
          Total de anotações:{' '}
          {selectedItem === 'Todas as anotações'
            ? noteList?.length
            : noteList?.filter(note => note.itemId === selectedItem).length}
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
