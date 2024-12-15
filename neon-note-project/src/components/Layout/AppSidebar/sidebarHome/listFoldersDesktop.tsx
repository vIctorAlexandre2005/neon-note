import { ButtonComponent } from '@/components/common/Button';
import { useContextNoteData } from '@/Context/NoteContext';
import { truncateText } from '@/utils/truncate';
import { BsTrash } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';

interface PropsListFolders {
  handleItemClick: (id: number, name: string) => void;
  folder: { id: number; name: string };
  selectedFolderId: string | number | null;
  darkMode: boolean;
  onOpenDeleteFolder: () => void;
}

export function ListFoldersDesktop({
  handleItemClick,
  folder,
  selectedFolderId,
  darkMode,
  onOpenDeleteFolder,
}: PropsListFolders) {
  return (
    <div className='flex flex-col'>
      <div
        className='w-full mb-2 flex justify-between items-center'
        onClick={() => handleItemClick(folder.id, folder.name)}
      >
        <div
          className={`
            flex gap-2 items-center justify-between cursor-pointer
            ${
              selectedFolderId === folder.id && darkMode
                ? 'bg-neon-800 bg-opacity-50 text-neon-200' // quando a pasta for selecionada e estiver modo escuro
                : selectedFolderId === folder.id && !darkMode
                  ? 'bg-gray-400 text-neon-500 text-opacity-80 bg-opacity-30' // quando a pasta for selecionada e estiver modo claro
                  : darkMode
                    ? 'text-black-100 hover:bg-gray-500 hover:bg-opacity-30 duration-300'
                    : 'text-black-700 hover:bg-gray-500 hover:bg-opacity-30 duration-300' // quando a pasta nao for selecionada
            } 
            rounded p-1 w-full
          `}
        >
          <div className='flex gap-2 items-center'>
            <FaFolder size={18} />
            <h1 className={`text-md font-bold`}>
              {truncateText(folder.name, 22)}
            </h1>
          </div>
          <ButtonComponent
            onClick={onOpenDeleteFolder}
            icon={<BsTrash size={18} />}
            className={`hover:bg-red-500 hover:text-white z-50 ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
          />
        </div>
      </div>
    </div>
  );
}
