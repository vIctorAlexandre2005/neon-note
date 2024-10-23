import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { ModalComponent } from '@/components/Modals/modal';
import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiFolderPlus, BiPlus } from 'react-icons/bi';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowDropright,
  IoIosArrowForward,
} from 'react-icons/io';

interface SidebarProps {
  darkMode: boolean;
}

interface Folder {
  id: number;
  name: string;
  items: string[];
}

export function SecondarySidebar({ darkMode }: SidebarProps) {
  const router = useRouter();

  const [openSubFolder, setOpenSubFolder] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const {
    isOpen: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  const {
    isOpen: isOpenAddItem,
    onOpen: onOpenAddItem,
    onClose: onCloseAddItem,
  } = useDisclosure();

  function openSubFolders() {
    setOpenSubFolder(!openSubFolder);
  }

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        items: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName(''); // Resetar o campo de input
    }
  };

  const handleAddItem = () => {
    if (selectedFolderId && newItemName.trim()) {
      setFolders(
        folders.map(folder =>
          folder.id === selectedFolderId
            ? { ...folder, items: [...folder.items, newItemName] }
            : folder
        )
      );
      setNewItemName(''); // Resetar o campo de input
    }
  };

  return (
    <div className={`flex-none w-full bg-slate-50`}>
      <div className={`flex-col mt-6 gap-4 flex`}>
        <div className='flex justify-between p-2 items-center'>
          <h1 className='text-2xl font-bold text-black-600'>Minhas pastas</h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<FaFolderPlus size={24} />}
            className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col gap-2'>
          {folders.length === 0 && (
            <div className='flex flex-col justify-center mt-20 items-center'>
              <Image alt='' src={'/emptyFolder1.svg'} width={200} height={200} />
              <h1 className='text-md font-semibold text-black-800'>
                Você ainda não possui pastas
              </h1>
            </div>
          )}

          {folders.length > 0 && (
            folders.map(folder => (
              <div className='flex flex-col p-2'>
                <div
                  className='w-full mb-2 flex justify-between items-center'
                  onClick={() => {
                    openSubFolders(), setSelectedFolderId(folder.id);
                  }}
                >
                  <div className='flex gap-2 items-center'>
                    {!openSubFolder ? <IoIosArrowForward /> : <IoIosArrowDown />}
                    <FaFolder size={18} />
                    <h1 className='text-md font-bold text-black-800'>
                      {folder.name}
                    </h1>
                  </div>
                  <div className='flex gap-4 items-center justify-between'>
                    <ButtonComponent
                      onClick={onOpenAddItem}
                      icon={<BiPlus size={18} />}
                      className='bg-neon-500 hover:bg-neon-600 text-white rounded-full'
                    />
                  </div>
                </div>
  
                {openSubFolder && folder.id === selectedFolderId && (
                  <div className='flex justify-center'>
                    {folder.items.map((item, index) => (
                      <div>
                        <h1 className='text-md font-semibold text-black-800'>
                          {item}
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {isOpenAddFolder && (
        <ModalComponent onClose={onCloseAddFolder} isOpen={isOpenAddFolder}>
          <div className='flex flex-col gap-4'>
            <InputComponent
              placeholder='Nome da pasta'
              value={newFolderName}
              onChange={e => setNewFolderName(e.target.value)}
            />

            <div className='flex gap-4'>
              <ButtonComponent
                onClick={handleAddFolder}
                text='Adicionar'
                className='bg-green-500'
              />
              <ButtonComponent
                onClick={onCloseAddFolder}
                text='Cancelar'
                className='bg-red-500'
              />
            </div>
          </div>
        </ModalComponent>
      )}

      {isOpenAddItem && (
        <ModalComponent onClose={onCloseAddItem} isOpen={isOpenAddItem}>
          <div className='flex flex-col gap-4'>
            <InputComponent
              placeholder='Nome do item'
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />

            <div className='flex gap-4'>
              <ButtonComponent
                onClick={handleAddItem}
                text='Adicionar'
                className='bg-green-500'
              />
              <ButtonComponent
                onClick={onCloseAddItem}
                text='Cancelar'
                className='bg-red-500'
              />
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
}
