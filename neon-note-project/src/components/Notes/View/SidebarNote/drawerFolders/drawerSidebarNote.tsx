import { ButtonComponent } from '@/components/common/Button';
import { BsTrash } from 'react-icons/bs';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { AddFolderModal } from '@/components/Layout/AppSidebar/modals/addFolder';
import { ListFoldersMobile } from './listFoldersMobile';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { ClipLoader } from 'react-spinners';
import { useContextGlobal } from '@/Context';
import { DrawerContentComponent } from '@/components/common/drawer';
import {
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  setNewFolderName,
}: DrawerSidebarNoteProps) {
  const { darkMode } = useContextGlobal();
  const {
    open: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  const { loadingFolders, setLoadingFolders } = useContextNoteData();

  return (
    <DrawerContentComponent>
      <div className='flex items-center justify-between'>
        <h1
          className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black-900'}`}
        >
          Minhas pastas
        </h1>
        <DialogRoot placement={'center'} open={isOpenAddFolder} onOpenChange={onOpenAddFolder}>
          <DialogTrigger>
            <ButtonComponent
              onClick={onOpenAddFolder}
              icon={<FaFolderPlus size={24} />}
              className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
            />
          </DialogTrigger>

          <DialogContent bg={darkMode ? '#0f172a' : 'white'} p={3}>
            <AddFolderModal
              darkMode={darkMode}
              handleAddFolder={handleAddFolder}
              newFolderName={newFolderName}
              onCloseAddFolder={onCloseAddFolder}
              setNewFolderName={setNewFolderName}
            />
          </DialogContent>
        </DialogRoot>
      </div>

      <div className='flex flex-col gap-2 mt-6 overflow-auto max-h-[calc(100vh-115px)]'>
        {loadingFolders && (
          <div className='flex items-center justify-center'>
            <ClipLoader color='#0949ee' size={24} />
          </div>
        )}

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
    </DrawerContentComponent>
  );
}
