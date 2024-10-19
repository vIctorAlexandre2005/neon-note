import { ModalComponent } from '@/components/Modals/modal';
import { successToast } from '@/utils/toasts/toasts';

interface Props {
  onModalClose: () => void;
  isModalOpen: boolean;
  darkMode: boolean;
  activeNoteId: any;
  deleteNote: (id: any) => void;
  onClose: () => void;
}

export function ModalDelete({
  onModalClose,
  isModalOpen,
  darkMode,
  activeNoteId,
  deleteNote,
  onClose,
}: Props) {
  return (
    <ModalComponent
      onClose={onModalClose}
      isOpen={isModalOpen}
      size='md'
      isCentered
      bg={darkMode ? '#1a1a1a' : 'white'}
      w={'auto'}
    >
      <div className='p-4'>
        <p
          className={`text-lg ${darkMode ? 'text-white' : 'text-black-800'} font-medium`}
        >
          Tem certeza que deseja excluir esta nota?
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          <button
            className='bg-red-600 text-white w-full font-medium text-lg hover:bg-red-500 duration-300 transition-all rounded-lg p-2'
            onClick={() => {
              deleteNote(activeNoteId.id);
              onModalClose();
              successToast('Nota excluída com sucesso!');
              onClose();
            }}
          >
            Sim
          </button>
          <button
            className='bg-blue-600 text-white w-full font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2'
            onClick={onModalClose}
          >
            Não
          </button>
        </div>
      </div>
    </ModalComponent>
  );
}
