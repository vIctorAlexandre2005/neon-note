import { PuffLoader, PulseLoader } from 'react-spinners';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CardTasks } from '../../Task/View/TasksCards/tasksCards';
import { FaPlus } from 'react-icons/fa';
import { useContextGlobal } from '@/Context';

interface TaskProps {
  statusTitle: string;
  statusIconColorBackground: string;
  statusIcon: JSX.Element;
  arrayTasks: any[];
  numberTasksStatus: number;
  colorProgressStatusBar: string;
  numberTasksStatusDone: number;
  thereIsNoButtonCreateTaskInSidebar: boolean;
}

export function SidebarTasksReuse({
  arrayTasks,
  statusIconColorBackground,
  statusIcon,
  statusTitle,
  numberTasksStatus,
  colorProgressStatusBar,
  numberTasksStatusDone,
  thereIsNoButtonCreateTaskInSidebar,
}: TaskProps) {
  const { darkMode } = useContextGlobal();

  return (
    <div
      className={`${darkMode ? 'bg-slate-900' : 'bg-white border border-gray-200'} w-full h-full xs:rounded-none md:rounded-xl p-2`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <h1
            className={`text-lg mt-2 ${darkMode ? 'text-white text-opacity-80' : 'text-black-700'}`}
          >
            {statusTitle} ({numberTasksStatus})
          </h1>
          <div
            className={`p-2 flex bg-${statusIconColorBackground}-500 bg-opacity-20 rounded-full`}
          >
            {statusIcon}
          </div>
        </div>

        {thereIsNoButtonCreateTaskInSidebar && (
          <div
            className={`flex hover:bg-slate-200 duration-300 rounded-full cursor-pointer text-black-700 p-2 gap-1 items-center`}
          >
            <FaPlus size={20} />
            <h1>Criar tarefa</h1>
          </div>
        )}
      </div>
      <div className='flex flex-col mt-3 gap-4 overflow-auto max-h-[calc(100vh-220px)]'>
        <DndProvider backend={HTML5Backend}>
          {arrayTasks?.map((note: any, index: number) => (
            <CardTasks
              key={index}
              colorProgressStatusBar={colorProgressStatusBar}
              note={note}
              darkMode={darkMode}
              moveNote={() => {}}
              index={index}
              numberTasksStatusDone={numberTasksStatusDone}
              numberTasksStatus={numberTasksStatus}
            />
          ))}
        </DndProvider>
      </div>
    </div>
  );
}
