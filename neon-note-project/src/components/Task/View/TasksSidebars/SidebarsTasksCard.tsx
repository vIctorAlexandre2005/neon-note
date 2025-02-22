import { useContextGlobal } from '@/Context';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClipLoader, PuffLoader, PulseLoader } from 'react-spinners';
import { CardTasks } from '../TasksCards/tasksCards';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useSidebarCardsNote } from '@/components/Notes/ViewModel/useSidebarCardsNote';
import { useSecondarySidebarNote } from '@/components/Notes/ViewModel/useSecondarySidebarNote';

export function SidebarTasks() {
  const { darkMode } = useContextGlobal();
  const { noteList, loadingNotes, moveNote, } = useSidebarCardsNote();

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
              task={note}
              title=''
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
