import { ButtonComponent } from '@/components/common/Button';
import { DeleteFolderModal } from '@/components/Layout/AppSidebar/modals/deleteFolder';
import { useSecondarySidebarNote } from '@/components/Notes/ViewModel/useSecondarySidebarNote';
import {
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useContextGlobal } from '@/Context';
import { useDisclosure } from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';

interface ListFoldersProps {
  setSelectedFolderId: (folderId: number) => void;
  handleItemClick: (item: number, name: string) => void;
  selectedFolderId: number | null | string;
  folder: any;
  onClose: () => void;
}
export function ListFoldersMobile({
  setSelectedFolderId,
  handleItemClick,
  selectedFolderId,
  folder,
  onClose,
}: ListFoldersProps) {
  const { darkMode } = useContextGlobal();
  const {
    open: isOpenDeleteFolder,
    onOpen: onOpenDeleteFolder,
    onClose: onCloseDeleteFolder,
  } = useDisclosure();

  const { deleteFolder } = useSecondarySidebarNote();

  return (
    <div className='flex flex-col'>
      <div
        className='w-full flex justify-between items-center'
        onClick={() => {
          setSelectedFolderId(folder.id);
        }}
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
          onClick={() => {
            handleItemClick(folder.id, folder.name);
          }}
        >
          <div className='flex gap-2 items-center'>
            <FaFolder size={18} />
            <h1 className={`text-md font-bold`}>{folder.name}</h1>
          </div>
          <DialogRoot open={isOpenDeleteFolder} placement={'center'}>
            <DialogTrigger>
              <ButtonComponent
                onClick={onOpenDeleteFolder}
                icon={<BsTrash size={18} />}
                className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
              />
            </DialogTrigger>

            <DialogContent p={3} bg={darkMode ? '#0f172a' : 'white'}>
              <DeleteFolderModal
                selectedFolderId={selectedFolderId as number | string}
                isOpenDeleteFolder={isOpenDeleteFolder}
                deleteFolder={deleteFolder}
                onCloseDeleteFolder={onCloseDeleteFolder}
              />
            </DialogContent>
          </DialogRoot>
        </div>
      </div>
    </div>
  );
}
