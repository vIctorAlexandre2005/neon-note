import FadeIn from '@/components/Effects/FadeIn';
import { truncateText } from '@/utils/truncate';
import { Progress } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BsListTask } from 'react-icons/bs';

interface Props {
  activeNote: any;
  handleSelectNote: (note: any) => void;
  onOpen: () => void;
  darkMode: boolean;
  moveNote: (fromIndex: any, toIndex: any) => void;
  note: any;
  index: any;
}

const ItemType = {
  NOTE: 'note',
};

export function CardTasks({
  activeNote,
  handleSelectNote,
  onOpen,
  darkMode,
  moveNote,
  note,
  index,
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
            onClick={() => {
              handleSelectNote(note);
              onOpen();
            }}
            className={`
                  ${activeNote === note.id ? 'bg-neon-500' : darkMode ? 'bg-neon-800' : 'bg-white border border-gray-300'} w-full rounded-xl p-2 cursor-pointer
                `}
          >
            <h2
              className={` text-xl mb-2 font-bold ${darkMode ? 'opacity-96 text-white' : 'text-black-900'}`}
            >
              Título
            </h2>
            <p
              className={`text-base text-opacity-80 ${darkMode ? 'opacity-96 text-white' : 'text-black-700'}`}
            >
              Descrição feita
            </p>

            <div>
              <div>
                <p className='text-sm mb-2 flex items-center text-black-500 gap-2 mt-2'>
                  <BsListTask size={20} />
                  Progresso
                </p>
              </div>

              <div>
                <Progress value={5} borderRadius={'full'} size='xs' colorScheme='orange' max={10} />
              </div>
            </div>
            <div className='mt-4 flex justify-end'>
              <p
                className={`${darkMode ? 'text-white' : 'text-black-800 bg-black-100 p-2 rounded-full opacity-60 text-xs'}`}
              >
                {new Date(note.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </Fragment>
      </FadeIn>
    </>
  );
}
