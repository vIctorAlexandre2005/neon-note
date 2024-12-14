import { ButtonComponent } from '@/components/common/Button';
import { DrawerComponent } from '@/components/common/drawer';
import { useTheme } from '@/components/ThemeDark';
import { BsTrash } from 'react-icons/bs';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { AddFolderModal } from '@/components/Layout/AppSidebar/modals/addFolter';
import { DeleteFolderModal } from '@/components/Layout/AppSidebar/modals/deleteFolder';
import { ListFoldersMobile } from './listFoldersMobile';

interface DrawerSidebarNoteProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  handleItemClick: (item: number, name: string) => void;
  selectedItem: string | null;
  setSelectedFolderId: (folderId: number) => void;
  folders: any[];
  selectedFolderId: number | null | string;
  handleAddFolder: () => void;
  newFolderName: string;
  setNewFolderName: Dispatch<SetStateAction<string>>;

}
export function DrawerSidebarNote({
  isOpenModal,
  onCloseModal,
  handleItemClick,
  selectedItem,
  setSelectedFolderId,
  folders,
  selectedFolderId,
  handleAddFolder,
  newFolderName,
  setNewFolderName
}: DrawerSidebarNoteProps) {
  const { darkMode } = useTheme();

  const {
    isOpen: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  return (
    <DrawerComponent
      isOpen={isOpenModal}
      onClose={onCloseModal}
      placement='left'
      onEsc={onCloseModal}
    >
      <div className='flex items-center justify-between'>
        <h1
          className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black-900'}`}
        >
          Minhas pastas
        </h1>
        <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<FaFolderPlus size={24} />}
            className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
          />
      </div>

      <div className='flex flex-col gap-2 mt-6'>
        {folders?.map((folder: any) => (
          <Fragment key={folder.id}>
            <ListFoldersMobile
              folder={folder} 
              handleItemClick={handleItemClick} 
              selectedFolderId={selectedFolderId} 
              setSelectedFolderId={setSelectedFolderId}
              onClose={onCloseModal}
            />
          </Fragment>
        ))}
      </div>

      {isOpenAddFolder && (
        <AddFolderModal
          darkMode={darkMode}
          handleAddFolder={handleAddFolder}
          isOpenAddFolder={isOpenAddFolder}
          newFolderName={newFolderName}
          onCloseAddFolder={onCloseAddFolder}
          setNewFolderName={setNewFolderName}
        />
      )}
    </DrawerComponent>
  );
}
