import { ModalContentComponent } from '@/components/common/modal';
import { useContextGlobal } from '@/Context';
import { successToast } from '@/utils/toasts/toasts';
import { useTaskSidebarAllFolders } from '../../../hook/useFolders/useTaskSidebarAllFolders';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NegativeButtonComponent, PositiveButtonComponent } from '@/components/common/Button';

interface Props {
  isOpenDeleteFolder: boolean;
  onCloseDeleteFolder: () => void;
  deleteFolder: (id: string | string[] | undefined) => void;
  selectedFolderId: string | number;
  id: string | string[] | undefined;
}

export function DeleteFolderModalTask({
  onCloseDeleteFolder,
  deleteFolder,
  id,
}: Props) {
  const { darkMode } = useContextGlobal();

  return (
    <div className=''>
      <p
        className={`text-2xl ${darkMode ? 'text-white' : 'text-black-800'} font-medium`}
      >
        Tem certeza que deseja excluir essa pasta?
      </p>
      <div className='flex justify-center gap-4 mt-6'>
        <NegativeButtonComponent
          text='Cancelar'
          className='bg-red-600 text-white w-full font-medium text-center text-lg hover:bg-red-500 duration-300 transition-all rounded-lg p-2'
          onClick={onCloseDeleteFolder}
        />
        <PositiveButtonComponent
          text='Sim, tenho'
          className='bg-blue-600 text-white w-full font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2'
          onClick={() => {
            deleteFolder(id);
            onCloseDeleteFolder();
          }}
        />  
      </div>
    </div>
  );
};
