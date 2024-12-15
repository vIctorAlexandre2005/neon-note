import FadeIn from '@/components/Effects/FadeIn';
import { truncateText } from '@/utils/truncate';
import { Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';

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

export function CardNotes({
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
                  ${activeNote === note.id ? 'bg-neon-500' : darkMode ? 'bg-neon-800' : 'bg-neon-400'} w-full rounded-xl p-2 cursor-pointer
                `}
          >
            {note.title && (
              <h2
                className={`text-white text-xl mb-2 font-bold ${darkMode ? 'opacity-96' : ''}`}
              >
                {truncateText(note.title, 28)}
              </h2>
            )}

            {note.text && (
              <p
                className={`text-white text-base text-opacity-80 ${darkMode ? 'opacity-96' : ''}`}
              >
                {truncateText(note.text, 55)}
              </p>
            )}
            <div className='mt-4 flex justify-end'>
              <p className={`
                text-xs
                ${darkMode ? 'text-white opacity-60' : 'text-white opacity-60'} 
                `}
              >
                Criada em {new Date(note.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </Fragment>
      </FadeIn>
    </>
  );
}
