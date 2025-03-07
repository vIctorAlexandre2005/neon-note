import { NegativeButtonComponent, PositiveButtonComponent } from '@/components/common/Button';
import { ModalContentComponent } from '@/components/common/modal';
import { useContextGlobal } from '@/Context';
import { successToast } from '@/utils/toasts/toasts';

interface Props {
  isOpenDeleteFolder: boolean;
  onCloseDeleteFolder: () => void;
  deleteFolder: (id: string) => void;
  selectedFolderId: string | number;
}

export function DeleteFolderModal({
  isOpenDeleteFolder,
  onCloseDeleteFolder,
  deleteFolder,
  selectedFolderId,
}: Props) {
  const { darkMode } = useContextGlobal();

  return (
      <div className=''>
        <p
          className={`text-xl ${darkMode ? 'text-white' : 'text-black-800'} text-center font-semibold`}
        >
          Deseja realmente excluir essa pasta?
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          <PositiveButtonComponent
            text='Não'
            onClick={onCloseDeleteFolder}
          />
          <NegativeButtonComponent
            text='Sim, desejo'
            onClick={() => {
              deleteFolder(selectedFolderId as string);
              onCloseDeleteFolder();
              successToast('Pasta excluída com sucesso!');
            }}
          />
            
        </div>
      </div>
  );
}
