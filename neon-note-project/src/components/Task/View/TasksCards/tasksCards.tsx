import FadeIn from '@/components/common/Effects/FadeIn';
import { ProgressBar, ProgressRoot } from '@/components/ui/progress';
import { Progress } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BsListTask } from 'react-icons/bs';
import { PiSirenBold } from 'react-icons/pi';

interface Props {
  darkMode: boolean;
  moveNote: (fromIndex: any, toIndex: any) => void;
  note: any;
  index: any;
  colorProgressStatusBar: string;
  numberTasksStatusDone: number;
  numberTasksStatus: number;
}

const ItemType = {
  NOTE: 'note',
};

export function CardTasks({
  darkMode,
  moveNote,
  note,
  index,
  colorProgressStatusBar,
  numberTasksStatusDone,
  numberTasksStatus,
}: Props) {
  const [, ref] = useDrag({
    type: ItemType.NOTE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.NOTE,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveNote(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <>
      <FadeIn key={note.id}>
        <Fragment key={index}>
          <div
            ref={node => {
              if (node !== null) {
                ref(drop(node));
              }
            }}
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
                Mariana Fuertes
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
                <Progress.Root size={'xs'} colorPalette={'blue'} variant={'outline'} className='w-full' value={90}>
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
