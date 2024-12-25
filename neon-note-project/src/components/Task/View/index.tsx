import { ClockLoader, HashLoader } from 'react-spinners';
import { SidebarNote } from '../../Notes/View/SidebarNote/SidebarNote';
import { SidebarTasks } from './TasksSidebars/SidebarsTasksCard';
import { MdOutlineEditNote } from 'react-icons/md';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { useSidebarCardsNote } from '../../Notes/ViewModel/useSidebarCardsNote';
import { SidebarTasksReuse } from '../../common/Task/SidebarTaskReuse';
import { ButtonComponent } from '@/components/common/Button';
import { IoOptionsSharp } from 'react-icons/io5';

export function TaskComponent() {
  const { noteList } = useSidebarCardsNote();
  const { darkMode } = useContextGlobal();
  const { selectedItem } = useContextNoteData();

  return (
    <div className='flex flex-col h-full gap-2 p-2'>
      <div className='flex justify-between items-center'>
      <h1
        className={`text-xl ${darkMode ? 'text-gray-300' : 'text-black-800'} font-bold`}
      >
        {selectedItem}
      </h1>

      <ButtonComponent 
        text='Filtrar' 
        className={`text-xl gap-2 ${darkMode ? 'text-gray-300' : 'text-black-800'} hover:bg-gray-200 transition duration-300 rounded-full`} 
        icon={<IoOptionsSharp size={32} 
        color={darkMode ? 'white' : 'black'} />} 
      />
      </div>
      <div className='flex gap-4 h-full'>
        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<HashLoader size={24} color='blue' />}
          statusTitle='A começar'
          statusIconColorBackground='blue'
          colorProgressStatusBar='blue'
          numberTasksStatusDone={0}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<ClockLoader size={20} color='orange' />}
          statusTitle='Em progresso'
          statusIconColorBackground='orange'
          colorProgressStatusBar='orange'
          numberTasksStatusDone={4}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={noteList}
          numberTasksStatus={noteList?.length}
          statusIcon={<BiCheckCircle size={24} color='#02ad41' />}
          statusTitle='Concluído'
          statusIconColorBackground='green'
          colorProgressStatusBar='green'
          numberTasksStatusDone={noteList?.length}
          thereIsNoButtonCreateTaskInSidebar={false}
        />
      </div>
    </div>
  );
}
