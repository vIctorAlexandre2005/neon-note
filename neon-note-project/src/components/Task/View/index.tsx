import { ClockLoader, HashLoader } from 'react-spinners';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { useSidebarCardsNote } from '../../Notes/ViewModel/useSidebarCardsNote';
import { SidebarTasksReuse } from '../../common/Task/SidebarTaskReuse';
import { useTaskSidebarAllFolders } from '../ViewModel/useTaskSidebarAllFolders';

interface TaskProps {
  projectName: string | undefined;
}

export function TaskComponent({projectName}: TaskProps) {
  const { tasksAllFolders } = useTaskSidebarAllFolders();
  const { darkMode } = useContextGlobal();

  return (
    <div className='flex flex-col h-full gap-2 p-2'>
      <h1
        className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-black-700'} font-semibold`}
      >
        {projectName}
      </h1>
      <div className='flex gap-4 h-full'>
        <SidebarTasksReuse
          arrayTasks={tasksAllFolders}
          numberTasksStatus={tasksAllFolders?.length}
          statusIcon={<HashLoader size={24} color='gray' />}
          statusTitle='A começar'
          statusIconColorBackground='gray'
          colorProgressStatusBar='gray'
          numberTasksStatusDone={0}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={tasksAllFolders}
          numberTasksStatus={tasksAllFolders?.length}
          statusIcon={<ClockLoader size={20} color='orange' />}
          statusTitle='Em progresso'
          statusIconColorBackground='orange'
          colorProgressStatusBar='orange'
          numberTasksStatusDone={4}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={tasksAllFolders}
          numberTasksStatus={tasksAllFolders?.length}
          statusIcon={<BiCheckCircle size={24} color='#02ad41' />}
          statusTitle='Concluído'
          statusIconColorBackground='green'
          colorProgressStatusBar='green'
          numberTasksStatusDone={tasksAllFolders?.length}
          thereIsNoButtonCreateTaskInSidebar={false}
        />
      </div>
    </div>
  );
}
