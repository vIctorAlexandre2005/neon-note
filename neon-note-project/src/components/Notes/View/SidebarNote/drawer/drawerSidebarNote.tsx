import { ButtonComponent } from '@/components/common/Button';
import { DrawerComponent } from '@/components/common/drawer';
import { useTheme } from '@/components/ThemeDark';
import { BsTrash } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';
import { ListFolders } from './listFolders';
import { Fragment } from 'react';

interface DrawerSidebarNoteProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onOpenDeleteFolder: () => void;
  handleItemClick: (item: string) => void;
  selectedItem: string | null;
  setSelectedFolderId: (folderId: number) => void;
  folders: any[];
  selectedFolderId: number | null | string;
}
export function DrawerSidebarNote({
  isOpenModal,
  onCloseModal,
  onOpenDeleteFolder,
  handleItemClick,
  selectedItem,
  setSelectedFolderId,
  folders,
  selectedFolderId,
}: DrawerSidebarNoteProps) {
  const { darkMode } = useTheme();

  return (
    <DrawerComponent
      isOpen={isOpenModal}
      onClose={onCloseModal}
      placement='left'
      onEsc={onCloseModal}
    >
      <div>
        <h1
          className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black-900'}`}
        >
          Minhas pastas
        </h1>
      </div>

      <div
        className='w-full mb-2 flex justify-between items-center'
        onClick={() => {
          setSelectedFolderId(1);
          handleItemClick('Todas as anotações');
        }}
      >
        <div
          className={`flex cursor-pointer
                ${
                  selectedItem === 'Todas as anotações' && darkMode
                    ? 'bg-neon-800 bg-opacity-50 text-neon-200' // quando a pasta for selecionada e estiver modo escuro
                    : selectedItem === 'Todas as anotações' && !darkMode
                      ? 'bg-gray-400 text-neon-500 text-opacity-80 bg-opacity-30' // quando a pasta for selecionada e estiver modo claro
                      : darkMode
                        ? 'text-black-100 hover:bg-gray-500 hover:bg-opacity-30 duration-300'
                        : 'text-black-700 hover:bg-gray-500 hover:bg-opacity-30 duration-300' // quando a pasta nao for selecionada
                }  items-center p-2 rounded w-auto`}
        >
          <HiDocumentText size={24} />
          <h1 className={`text-md font-bold`}>Todas as anotações</h1>
        </div>
      </div>
      <div>
        {folders?.map((folder: any) => (
          <Fragment key={folder.id}>
            <ListFolders 
              folder={folder} 
              handleItemClick={handleItemClick} 
              selectedFolderId={selectedFolderId} 
              setSelectedFolderId={setSelectedFolderId} 
              onOpenDeleteFolder={onOpenDeleteFolder}
            />
          </Fragment>
        ))}
      </div>
    </DrawerComponent>
  );
}
