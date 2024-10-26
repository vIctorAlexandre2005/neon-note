import FadeIn from '@/components/Effects/FadeIn';
import { truncateText } from '@/utils/truncate';
import { Fragment } from 'react';

interface Props {
  filteredNotes: any[];
  activeNote: any;
  handleSelectNote: (note: any) => void;
  onOpen: () => void;
  darkMode: boolean;
}

export function CardNotes({
  filteredNotes,
  activeNote,
  handleSelectNote,
  onOpen,
  darkMode,
}: Props) {
  return (
    <>
      {filteredNotes?.map((note: any, index: number) => (
        <FadeIn key={note.id}>
          <Fragment key={index}>
            <div
              onClick={() => {
                handleSelectNote(note);
                onOpen();
              }}
              className={`
                  ${activeNote === note.id ? 'bg-neon-500' : darkMode ? 'bg-neon-800' : 'bg-neon-400'} w-full rounded-xl p-2 cursor-pointer
                `}
            >
              {note.title ? (
                <h2
                  className={`text-white text-2xl mb-2 font-bold ${darkMode ? 'opacity-96' : ''}`}
                >
                  {truncateText(note.title, 16)}
                </h2>
              ) : (
                <h2
                  className={`text-white text-2xl mb-2 font-bold italic ${darkMode ? 'opacity-30' : ''}`}
                >
                  Vazio
                </h2>
              )}

              {note.text ? (
                <p
                  className={`text-white text-opacity-80 ${darkMode ? 'opacity-96' : ''}`}
                >
                  {truncateText(note.text, 66)}
                </p>
              ) : (
                <p
                  className={`text-white text-opacity-80 italic ${darkMode ? 'opacity-30' : ''}`}
                >
                  Vazio
                </p>
              )}
              <div className='mt-4 flex justify-end'>
                <p className='text-white opacity-40 text-xs'>
                  Criada em {new Date(note.date).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(note.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </Fragment>
        </FadeIn>
      ))}
    </>
  );
}
