import { ClockLoader, HashLoader } from 'react-spinners';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { useSidebarCardsNote } from '../../Notes/ViewModel/useSidebarCardsNote';
import { SidebarTasksReuse } from '../../common/Task/SidebarTaskReuse';
import { useSecondarySidebarTask } from '../ViewModel/useSecondarySidebarTask';

export function TaskComponent() {
  const { tasksFolders, newTaskFolderName } = useSecondarySidebarTask()
  const { darkMode } = useContextGlobal();

  return (
    <div className='flex flex-col h-full gap-2 p-2'>
        <h1
          className={`text-xl ${darkMode ? 'text-gray-300' : 'text-black-800'} font-bold`}
        >
          {newTaskFolderName}
        </h1>
      <div className='flex gap-4 h-full'>
        <SidebarTasksReuse
          arrayTasks={tasksFolders}
          numberTasksStatus={tasksFolders?.length}
          statusIcon={<HashLoader size={24} color='blue' />}
          statusTitle='A começar'
          statusIconColorBackground='blue'
          colorProgressStatusBar='blue'
          numberTasksStatusDone={0}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={tasksFolders}
          numberTasksStatus={tasksFolders?.length}
          statusIcon={<ClockLoader size={20} color='orange' />}
          statusTitle='Em progresso'
          statusIconColorBackground='orange'
          colorProgressStatusBar='orange'
          numberTasksStatusDone={4}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={tasksFolders}
          numberTasksStatus={tasksFolders?.length}
          statusIcon={<BiCheckCircle size={24} color='#02ad41' />}
          statusTitle='Concluído'
          statusIconColorBackground='green'
          colorProgressStatusBar='green'
          numberTasksStatusDone={tasksFolders?.length}
          thereIsNoButtonCreateTaskInSidebar={false}
        />
      </div>
    </div>
  );
}
