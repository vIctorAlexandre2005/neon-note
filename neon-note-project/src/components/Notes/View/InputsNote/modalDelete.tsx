import {
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { ModalContentComponent } from '@/components/common/modal';
import { successToast } from '@/utils/toasts/toasts';

interface Props {
  onModalClose: () => void;
  darkMode: boolean;
  activeNoteId: any;
  deleteNote: (id: any) => void;
}

export function ModalDelete({
  darkMode,
  onModalClose,
  activeNoteId,
  deleteNote,
}: Props) {
  return (
    <div className=''>
      <p
        className={`text-xl ${darkMode ? 'text-white' : 'text-black-800'} font-semibold`}
      >
        Deseja mesmo excluir esta anotação?
      </p>
      <div className='flex justify-center gap-4 mt-6'>
        <PositiveButtonComponent text='Não' onClick={onModalClose} />
        <NegativeButtonComponent
          onClick={() => {
            deleteNote(activeNoteId.id);
            onModalClose();
          }}
          text='Sim'
        />
      </div>
    </div>
  );
}
