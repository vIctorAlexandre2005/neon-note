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
      className={`${darkMode ? 'bg-slate-700 bg-opacity-20 border border-slate-800 border-opacity-70' : 'bg-slate-50 shadow-xl border border-gray-500 border-opacity-20'} w-full h-full rounded-3xl p-2`}
    >
      <div
        className={`flex items-center justify-between ${statusTitle === 'A iniciar' ? 'bg-neon-500' : statusTitle === 'Em progresso' ? 'bg-orange-500' : 'bg-green-500'} rounded-full p-1`}
      >
        <div className={`flex gap-2 items-center `}>
          <div
            className={`flex justify-center font-semibold items-center rounded-full h-8 w-12 bg-white ${statusTitle === 'A iniciar' ? 'text-neon-500' : statusTitle === 'Em progresso' ? 'text-orange-500' : 'text-green-500'}`}
          >
            {numberTasksStatus}
          </div>
          <h1 className={`text-lg text-black-50 font-semibold`}>
            {statusTitle}
          </h1>
        </div>

        {thereIsNoButtonCreateTaskInSidebar && (
          <div
            className={`flex duration-300 rounded-full cursor-pointer gap-1 items-center pr-2`}
          >
            <FaPlus size={20} />
          </div>
        )}
      </div>
      <div className='flex flex-col mt-3 gap-4 p-2 overflow-auto max-h-[calc(100vh-220px)]'>
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
