import FadeIn from '@/components/common/Effects/FadeIn';
import { ProgressBar, ProgressRoot } from '@/components/ui/progress';
import { StatusTasksFromProjectProps } from '@/utils/mockFolders';
import { Progress } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BsListTask } from 'react-icons/bs';
import { MdOutlineLabelImportant } from 'react-icons/md';
import {
  PiChartLineDown,
  PiSealWarningFill,
  PiSirenBold,
} from 'react-icons/pi';
import { RxHalf2 } from 'react-icons/rx';

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
}: Props) {
  return (
    <>
      <FadeIn>
        <Fragment key={task.id}>
          <div
            className={`
                  ${darkMode ? 'bg-neon-900 bg-opacity-25' : 'bg-white border border-gray-300 shadow-md'} rounded-2xl p-2 cursor-pointer
                `}
          >
            <div className='flex flex-col gap-3'>
              <h1
                className={`
                ${
                  priority === 'URGENTE'
                    ? ` w-28 ${darkMode ? 'bg-red-500 bg-opacity-15' : 'bg-red-100'} text-red-500`
                    : priority === 'IMPORTANTE'
                      ? `${darkMode ? 'bg-orange-500 bg-opacity-25' : 'bg-orange-100'} text-orange-500 w-36`
                      : priority === 'MÉDIO'
                        ? `${darkMode ? 'bg-purple-500 bg-opacity-25' : 'bg-purple-100'} text-purple-500 w-28`
                        : darkMode
                          ? `bg-green-500 bg-opacity-25 text-green-500 ${darkMode ? 'bg-green-500 bg-opacity-25' : 'bg-green-100'} w-24`
                          : 'bg-green-100 text-green-500 w-24'
                }
                flex items-center gap-2 font-bold text-sm p-2 rounded-full
                `}
              >
                {priority}
                {priority === 'URGENTE' ? (
                  <PiSirenBold size={20} />
                ) : priority === 'IMPORTANTE' ? (
                  <PiSealWarningFill size={20} />
                ) : priority === 'MÉDIO' ? (
                  <RxHalf2 size={20} />
                ) : (
                  <PiChartLineDown size={20} />
                )}
              </h1>
              <h2
                className={` text-xl mb-2 font-bold ${darkMode ? 'opacity-96 text-white' : 'text-black-900'}`}
              >
                {title}
              </h2>
            </div>

            <div>
              <div className='flex justify-between items-center'>
                <p className='flex items-center text-black-400 gap-2'>
                  <BsListTask size={20} />
                  Progresso
                </p>

                <p className='flex items-center text-black-200 gap-2'>
                  {numberTasksStatusDone}/{numberTasksStatus}
                </p>
              </div>

              <div>
              <progress className="w-full h-1 rounded-full bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500" value={3} max={numberTasksStatus} />
              </div>
            </div>
            <div className='flex justify-start'>
              <p
                className={`${darkMode ? 'text-gray-400' : 'text-black-800 bg-black-100 p-2 rounded-full opacity-60'} text-sm`}
              >
                Criado em 20/04/2005
              </p>
            </div>
          </div>
        </Fragment>
      </FadeIn>
    </>
  );
}
