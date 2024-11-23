import { BiPlus } from 'react-icons/bi';
import { useTheme } from '../../ThemeDark';
import FadeIn from '../../Effects/FadeIn';
import { Fragment, useEffect, useState } from 'react';
import { truncateText } from '@/utils/truncate';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { useContextGlobal } from '@/Context';
import { useContextNoteData } from '@/Context/NoteContext';
import { CardNotes } from './cardNotes';
import { ButtonComponent } from '@/components/common/Button';
import { useSecondarySidebar } from '@/hooks/useSecondarySidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSidebarNote } from '../ViewModel/useSidebarNote';
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
    moveNote,
  } = useSidebarNote();

  const { folders, selectedFolderId, setSelectedFolderId } =
    useSecondarySidebar();

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

  const {
    isOpen: isOpenDeleteFolder,
    onOpen: onOpenDeleteFolder,
    onClose: onCloseDeleteFolder,
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
      className={`${darkMode ? 'bg-slate-900' : 'bg-white border border-gray-200'} w-full h-full rounded-xl p-2`}
    >
      <div className='flex justify-between items-center'>
        <h1
          className={`text-2xl mt-2 ${darkMode ? 'text-white text-opacity-80' : 'text-black-900'}`}
        >
          {selectedItem}
        </h1>
        <ButtonComponent
          onClick={() => {
            onOpenModal();
          }}
          isLoading={loading}
          icon={<IoFolderOpenSharp color='white' size={24} />}
          className='bg-neon-400 hover:bg-neon-500 rounded-full'
        />
      </div>
      <div className='flex flex-col mt-3'>
        <div className='flex gap-1 items-center'>
          <input
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
          />
          <div className='xs:hidden md:flex'>
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
        <Drawer placement='left' isOpen={isOpenModal} onClose={onCloseModal}>
          <DrawerOverlay />
          <DrawerContent p={4} bg={darkMode ? '#0f172a' : 'white'}>
            <div>
              <h1 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black-900'}`}>Minhas pastas</h1>
            </div>

            <div
              className='w-full mb-2 flex justify-between items-center'
              onClick={() => {
                setSelectedFolderId(1);
                handleItemClick('Todas as anotações');
              }}
            >
              <div
                className={`flex cursor-pointer
                ${
                  selectedItem === 'Todas as anotações' && darkMode
                    ? 'bg-neon-800 bg-opacity-50 text-neon-200' // quando a pasta for selecionada e estiver modo escuro
                    : selectedItem === 'Todas as anotações' && !darkMode
                      ? 'bg-gray-400 text-neon-500 text-opacity-80 bg-opacity-30' // quando a pasta for selecionada e estiver modo claro
                      : darkMode
                        ? 'text-black-100 hover:bg-gray-500 hover:bg-opacity-30 duration-300'
                        : 'text-black-700 hover:bg-gray-500 hover:bg-opacity-30 duration-300' // quando a pasta nao for selecionada
                }  items-center p-2 rounded w-auto`}
              >
                <HiDocumentText size={24} />
                <h1 className={`text-md font-bold`}>Todas as anotações</h1>
              </div>
            </div>

            <div>
              {folders?.map((folder: any) => (
                <div className='flex flex-col'>
                  <div
                    className='w-full flex justify-between items-center'
                    onClick={() => {
                      setSelectedFolderId(folder.id);
                    }}
                  >
                    <div
                      className={`
                    flex gap-2 items-center justify-between cursor-pointer
                    ${
                      selectedFolderId === folder.id && darkMode
                        ? 'bg-neon-800 bg-opacity-50 text-neon-200' // quando a pasta for selecionada e estiver modo escuro
                        : selectedFolderId === folder.id && !darkMode
                          ? 'bg-gray-400 text-neon-500 text-opacity-80 bg-opacity-30' // quando a pasta for selecionada e estiver modo claro
                          : darkMode
                            ? 'text-black-100 hover:bg-gray-500 hover:bg-opacity-30 duration-300'
                            : 'text-black-700 hover:bg-gray-500 hover:bg-opacity-30 duration-300' // quando a pasta nao for selecionada
                    } 
                    rounded p-1 w-full
                  `}
                      onClick={() => {
                        handleItemClick(folder.name);
                      }}
                    >
                      <div className='flex gap-2 items-center'>
                        <FaFolder size={18} />
                        <h1 className={`text-md font-bold`}>{folder.name}</h1>
                      </div>
                      <ButtonComponent
                        onClick={onOpenDeleteFolder}
                        icon={<BsTrash size={18} />}
                        className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
