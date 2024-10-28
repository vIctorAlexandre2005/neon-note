import { ModalComponent } from '@/components/Modals/modal';
import { useTheme } from '@/components/ThemeDark';
import { successToast } from '@/utils/toasts/toasts';

interface Props {
  isOpenDeleteFolder: boolean;
  onCloseDeleteFolder: () => void;
  deleteFolder: (id: number) => void;
  selectedFolderId: number | null;
}

export function DeleteFolderModal({
  isOpenDeleteFolder,
  onCloseDeleteFolder,
  deleteFolder,
  selectedFolderId
}: Props) {
  const { darkMode } = useTheme();

  return (
    <ModalComponent isOpen={isOpenDeleteFolder} onClose={onCloseDeleteFolder}>
      <div className='p-4'>
        <p
          className={`text-lg ${darkMode ? 'text-white' : 'text-black-800'} font-medium`}
        >
          Tem certeza que deseja excluir esta pasta?
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          <button
            className='bg-red-600 text-white w-full font-medium text-lg hover:bg-red-500 duration-300 transition-all rounded-lg p-2'
            onClick={() => {
                deleteFolder(selectedFolderId as number);
                onCloseDeleteFolder();
                successToast('Pasta excluída com sucesso!');
            }}
          >
            Sim
          </button>
          <button
            className='bg-blue-600 text-white w-full font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2'
            onClick={onCloseDeleteFolder}
          >
            Não
          </button>
        </div>
      </div>
    </ModalComponent>
  );
}
