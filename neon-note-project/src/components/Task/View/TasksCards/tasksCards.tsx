import FadeIn from '@/components/common/Effects/FadeIn';
import { DialogRoot, DialogTrigger } from '@/components/ui/dialog';
import { StatusTasksFromProjectProps } from '@/utils/mockFolders';
import { truncateText } from '@/utils/truncate';
import { Fragment } from 'react';
import { BsListTask } from 'react-icons/bs';
import {
  PiChartLineDown,
  PiSealWarningFill,
  PiSirenBold,
} from 'react-icons/pi';
import { RxHalf2 } from 'react-icons/rx';
import { ModalViewCardTask } from '../Main/dialogs/tasks/modalViewCard';
import { useCardTasks } from '../../ViewModel/useTasks';

interface Props {
  darkMode?: boolean;
  title: string;
  task: StatusTasksFromProjectProps;
  colorProgressStatusBar: string;
  numberTasksStatusDone: number;
  numberTasksStatus: number;
  note?: any;
  index?: number;
  priority: string;
  description?: string;
  date?: string;
}
export function CardTasks({
  darkMode,
  title,
  task,
  note,
  index,
  colorProgressStatusBar,
  numberTasksStatusDone,
  numberTasksStatus,
  priority,
  description,
  date,
}: Props) {
  const {
    isOpenModalViewCardTask,
    onCloseModalViewCardTask,
    onOpenModalViewCardTask,
  } = useCardTasks();
  return (
    <>
      <FadeIn>
        <Fragment key={task.id}>
          <DialogRoot open={isOpenModalViewCardTask} size={'xl'}>
            <div
              onClick={onOpenModalViewCardTask}
              className={`
                  ${darkMode ? 'bg-neon-900 hover:bg-neon-800 bg-opacity-25 border border-gray-800' : 'bg-white hover:bg-black-50 border border-gray-200 shadow-md shadow-black-200'} 
                  rounded-xl p-2 cursor-pointer transition duration-200 hover:bg-opacity-40
                `}
            >
              <h1
                className={`
                        ${
                          priority === 'URGENTE'
                            ? ` w-24 ${darkMode ? 'bg-red-500 bg-opacity-15' : 'bg-red-100'} text-red-500`
                            : priority === 'IMPORTANTE'
                              ? `${darkMode ? 'bg-orange-500 bg-opacity-25' : 'bg-orange-100'} text-orange-500 text-center w-32`
                              : priority === 'MÉDIO'
                                ? `${darkMode ? 'bg-purple-500 bg-opacity-25' : 'bg-purple-100'} text-purple-500 w-20`
                                : darkMode
                                  ? `bg-green-500 bg-opacity-25 text-green-500 ${darkMode ? 'bg-green-500 bg-opacity-25' : 'bg-green-100'} w-24`
                                  : 'bg-green-100 text-green-500 w-20'
                        }
                              flex items-center gap-2 font-bold text-xs p-2 rounded-full
                      `}
              >
                {priority}
                {priority === 'URGENTE' && <PiSirenBold size={20} />}
                {priority === 'IMPORTANTE' && <PiSealWarningFill size={20} />}
                {priority === 'MÉDIO' && <RxHalf2 size={20} />}
                {priority === 'BAIXO' && <PiChartLineDown size={20} />}
              </h1>
              <DialogTrigger w={'full'} display={'flex'}>
                <div className='w-full mt-2'>
                  <h2
                    className={`text-xl text-left mb-2 font-bold ${darkMode ? 'opacity-96 text-white' : 'text-black-700'}`}
                  >
                    {truncateText(title, 40)}
                  </h2>
                  <div className='flex w-full justify-between items-center'>
                    <p className='flex items-center text-black-400 gap-2'>
                      <BsListTask size={20} />
                      Progresso
                    </p>

                    <p className='flex items-center text-black-200 gap-2'>
                      {numberTasksStatusDone}/{numberTasksStatus}
                    </p>
                  </div>
                  <progress
                    className={`
                    w-full h-1 rounded-full bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 p-1 
                    ${priority === 'URGENTE' && '[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500'}
                    ${priority === 'IMPORTANTE' && '[&::-webkit-progress-value]:bg-orange-500 [&::-moz-progress-bar]:bg-orange-500'}
                    ${priority === 'MÉDIO' && '[&::-webkit-progress-value]:bg-purple-500 [&::-moz-progress-bar]:bg-purple-500'}
                    ${priority === 'BAIXO' && '[&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500'}
                    `}
                    value={numberTasksStatusDone}
                    max={numberTasksStatus}
                  />

                  <div className='flex justify-start'>
                    <p
                      className={`${darkMode ? 'text-gray-400' : 'text-black-500 bg-black-100 p-2 rounded-full bg-opacity-30'} font-semibold text-xs`}
                    >
                      {date}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
            </div>
            <ModalViewCardTask
              onCloseModalViewCardTask={onCloseModalViewCardTask}
              taskId={task.id}
              title={title}
              description={description || ''}
              priority={priority}
            />
          </DialogRoot>
        </Fragment>
      </FadeIn>
    </>
  );
}
