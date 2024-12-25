import { ClockLoader, HashLoader } from 'react-spinners';
import { SidebarNote } from '../../Notes/View/SidebarNote/SidebarNote';
import { SidebarTasks } from './TasksSidebars/SidebarsTasksCard';
import { MdOutlineEditNote } from 'react-icons/md';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { useSidebarCardsNote } from '../../Notes/ViewModel/useSidebarCardsNote';
import { SidebarTasksReuse } from '../../common/Task/SidebarTaskReuse';

export function TaskComponent() {
  const { noteList } = useSidebarCardsNote();
  const { darkMode } = useContextGlobal();
  const { selectedItem } = useContextNoteData();

  return (
    <div className='flex flex-col h-full gap-2 p-4'>
      <h1
        className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-black-800'} font-bold`}
      >
        {' '}
        {selectedItem}{' '}
      </h1>
      <div className='flex gap-4 h-full'>
        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<HashLoader size={24} color='blue' />}
          statusTitle='A começar'
          statusIconColorBackground='blue'
          colorProgressStatusBar='blue'
          numberTasksStatusDone={0}
        />

        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<ClockLoader size={20} color='orange' />}
          statusTitle='Em progresso'
          statusIconColorBackground='orange'
          colorProgressStatusBar='orange'
          numberTasksStatusDone={4}
        />

        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<BiCheckCircle size={24} color='#02ad41' />}
          statusTitle='Concluído'
          statusIconColorBackground='green'
          colorProgressStatusBar='green'
          numberTasksStatusDone={noteList?.length}
        />
      </div>
    </div>
  );
}
