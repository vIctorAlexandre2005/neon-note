import FadeIn from '@/components/common/Effects/FadeIn';
import { ProgressBar, ProgressRoot } from '@/components/ui/progress';
import { StatusTasksFromProjectProps } from '@/utils/mockFolders';
import { Progress } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BsListTask } from 'react-icons/bs';
import { PiSirenBold } from 'react-icons/pi';

interface Props {
  darkMode?: boolean;
  title: string;
  task: StatusTasksFromProjectProps;
  colorProgressStatusBar: string;
  numberTasksStatusDone: number;
  numberTasksStatus: number;
  note?: any;
  index?: number;
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
}: Props) {

  return (
    <>
      <FadeIn>
        <Fragment key={task.id}>
          <div
            className={`
                  ${darkMode ? 'bg-neon-900 bg-opacity-25' : 'bg-white border border-gray-300 shadow-md'} w-full rounded-2xl p-2 cursor-pointer
                `}
          >
            <div className='flex flex-col gap-3'>
              <h1 className='flex items-center gap-2 bg-red-500 bg-opacity-15 text-red-500 font-bold text-sm w-24 p-1 rounded-full'>
                Urgente
                <PiSirenBold size={20} />
              </h1>
              <h2
                className={` text-xl mb-2 font-bold ${darkMode ? 'opacity-96 text-white' : 'text-black-900'}`}
              >
                {title}
              </h2>
            </div>

            <div>
              <div className='flex justify-between items-center'>
                <p className='mb-2 flex items-center text-black-400 gap-2'>
                  <BsListTask size={20} />
                  Progresso
                </p>

                <p className='mb-2 flex items-center text-black-200 gap-2 mt-2'>
                  {numberTasksStatusDone}/{numberTasksStatus}
                </p>
              </div>

              <div>
                <Progress.Root
                  size={'xs'}
                  colorPalette={'blue'}
                  variant={'outline'}
                  className='w-full'
                  value={task.progressTask}
                >
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </div>
            </div>
            <div className='mt-4 flex justify-start'>
              <p
                className={`${darkMode ? 'text-gray-400' : 'text-black-800 bg-black-100 p-2 rounded-full opacity-60 text-xs'}`}
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
