import FadeIn from '@/components/Effects/FadeIn';
import { useTheme } from '@/components/ThemeDark';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';

interface Props {
  saving: boolean;
  saved: boolean;
  activeNoteId: any;
  deleteNote: (id: any) => void;
  blockNote: (id: any) => void;
  isBlockEdited: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}

export function OptionsHeaderNote({
  saving,
  saved,
  activeNoteId,
  deleteNote,
  blockNote,
  isBlockEdited,
  onModalOpen,
  onModalClose,
}: Props) {
  const { darkMode } = useTheme();
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2 items-center justify-start'>
        {!saving && saved && (
          <>
            <FadeIn>
              <div className='flex gap-1 items-center'>
                <p className={`${darkMode ? 'text-white' : 'text-black-800'}`}>
                  Salvo
                </p>{' '}
                <BiCheck size={24} className='text-green-400' />
              </div>
            </FadeIn>
          </>
        )}
      </div>
      <div className='flex gap-4 items-center justify-end'>
        <button
          className={`${darkMode ? 'text-white flex items-centerduration-200 transition-all' : 'text-black-800 flex items-center duration-200 transition-all'}`}
          onClick={() => blockNote(activeNoteId.id)}
        >
          {isBlockEdited ? (
            <>
              Bloqueado <TbLock size={24} />
            </>
          ) : (
            <>
              Desbloqueado <TbLockOpen2 size={24} />
            </>
          )}
        </button>

        <button
          className={`${darkMode ? 'text-white hover:text-red-500 duration-200 transition-all' : 'text-black-800 hover:text-red-500 duration-200 transition-all'}`}
          onClick={onModalOpen}
        >
          <BiTrash size={24} />
        </button>
      </div>
    </div>
  );
}
