import { ModalContentComponent } from '@/components/common/modal';
import { useContextGlobal } from '@/Context';
import { successToast } from '@/utils/toasts/toasts';
import { useTaskSidebarAllFolders } from '../../ViewModel/useTaskSidebarAllFolders';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { InputComponent } from '@/components/common/InputField';

interface Props {
  selectedFolderId: string | number;
  id: string | string[] | undefined;
  onCloseModalEditNameFolder: () => void;
  newFolderName: string;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  handleEditFolderTask: (id: string | string[] | undefined) => void;
}

export function EditFolderModalTask({
  onCloseModalEditNameFolder,
  handleEditFolderTask,
  selectedFolderId,
  id,
  newFolderName,
  setNewFolderName,
}: Props) {
  const { darkMode } = useContextGlobal();

  const { editedTaskFolderName, setEditedTaskFolderName } = useTaskSidebarAllFolders();

  return (
    <div className='p-4'>
      <p
        className={`text-lg ${darkMode ? 'text-white' : 'text-black-800'} font-medium`}
      >
        Edite o nome da pasta
      </p>
      <InputComponent
        placeholder='Inserir o novo nome da pasta'
        className={`w-full p-2 border border-neon-400 focus:border-2 outline-none rounded-lg ${darkMode ? 'text-white bg-black-900' : 'text-black-800 bg-white'} `}
        value={editedTaskFolderName}
        onChange={e => setEditedTaskFolderName(e.target.value)}
      />

      <div className='flex justify-center gap-4 mt-6'>
        <button
          className='bg-red-600 text-white w-full font-medium text-center text-lg hover:bg-red-500 duration-300 transition-all rounded-lg p-2'
          onClick={onCloseModalEditNameFolder}
        >
          Cancelar
        </button>
        <button 
          onClick={() => {
            handleEditFolderTask(id);
            onCloseModalEditNameFolder();
          }}
          className='bg-blue-600 text-white w-full font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2'
        >
          Ok
        </button>
      </div>
    </div>
  );
}
