import { ButtonComponent } from '@/components/common/Button';
import { CardNotes } from '@/components/Notes/View/SidebarNote/cardNotes';
import { useSidebarNote } from '@/components/Notes/ViewModel/useSidebarNote';
import { useTheme } from '@/components/ThemeDark';
import { useContextGlobal } from '@/Context';
import { useSecondarySidebarHome } from '@/hooks/useSecondarySidebar/sidebarHome';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BiPlus } from 'react-icons/bi';
import { IoFolderOpenSharp } from 'react-icons/io5';
import { ClipLoader, PuffLoader, PulseLoader } from 'react-spinners';
import { RiProgress3Line } from 'react-icons/ri';
import { CardTasks } from '../TasksCards/tasksCards';
import { useContextNoteData } from '@/Context/NoteContext';

export function SidebarTasks() {
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

  const { selectedItem, handleItemClick } = useContextNoteData();
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
      <div className='flex gap-2 items-center'>
        <h1
          className={`text-lg mt-2 animate-flute ${darkMode ? 'text-white text-opacity-80' : 'text-black-900'}`}
        >
          Em progresso (8)
        </h1>
        <div className='p-2 flex bg-orange-500 bg-opacity-20 rounded-full'>
          <PuffLoader size={20} color='orange' />
        </div>
      </div>
      <div className='flex flex-col mt-3 gap-4 overflow-auto max-h-[calc(100vh-170px)]'>
        {loadingNotes && (
          <div className='flex justify-center items-center mt-24'>
            <PulseLoader color='#004aff' size={24} />
          </div>
        )}
        {!loadingNotes && (
          <DndProvider backend={HTML5Backend}>
            {noteList?.map((note: any, index: number) => (
              <CardTasks
                moveNote={moveNote}
                note={note}
                darkMode={darkMode}
                index={index}
                colorProgressStatusBar=''
                numberTasksStatus={0}
                numberTasksStatusDone={0}  
              />
            ))}
          </DndProvider>
        )}
      </div>
    </div>
  );
}
