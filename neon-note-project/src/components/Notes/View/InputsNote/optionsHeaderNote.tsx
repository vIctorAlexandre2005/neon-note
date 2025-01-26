import { ButtonComponent } from '@/components/common/Button';
import FadeIn from '@/components/common/Effects/FadeIn';
import { useContextGlobal } from '@/Context';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';
import { ModalDelete } from './modalDelete';
import {
  ModalContentComponent,
  ModalRootComponent,
} from '@/components/common/modal';
import { DialogBody, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  saving: boolean;
  saved: boolean;
  activeNoteId: any;
  deleteNote: (id: any) => void;
  blockNote: (id: any) => void;
  isBlockEdited: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  isModalOpen: boolean;
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
  isModalOpen,
}: Props) {
  const { darkMode } = useContextGlobal();
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
        <ButtonComponent
          onClick={() => blockNote(activeNoteId.id)}
          className={`${darkMode ? 'text-white' : 'text-black-800'}`}
          text={isBlockEdited ? 'Bloqueado' : 'Desbloqueado'}
          icon={
            isBlockEdited ? <TbLock size={24} /> : <TbLockOpen2 size={24} />
          }
        />

        <ModalRootComponent isOpen={isModalOpen} onClose={onModalClose}>
          <>
            <ButtonComponent
              onClick={onModalOpen}
              className={`${darkMode ? 'text-white hover:text-red-500 duration-200 transition-all' : 'text-black-800 hover:text-red-500 duration-200 transition-all'}`}
              icon={<BiTrash size={24} />}
            />

            <ModalContentComponent
              content={
                <>
                  <DialogHeader>
                    <DialogTitle
                      className={`${darkMode ? 'text-white' : 'text-black-800'} font-semibold text-xl text-center`}
                    >
                      Tem certeza que deseja excluir essa nota?
                    </DialogTitle>
                  </DialogHeader>

                  <DialogFooter display={'flex'} gap={4} justifyContent={'center'} alignItems={'center'}>
                    <ButtonComponent 
                      className='bg-red-500 hover:bg-red-700 p-2 w-full text-white font-semibold' 
                      text='Sim' 
                      onClick={() =>deleteNote(activeNoteId.id)}
                    />
                    <ButtonComponent 
                      text='Não' 
                      className='bg-neon-500 hover:bg-neon-700 font-semibold text-white p-2 w-full' 
                      onClick={onModalClose}
                    />
                  </DialogFooter>
                </>
              }
            />
          </>
        </ModalRootComponent>
      </div>
    </div>
  );
}
