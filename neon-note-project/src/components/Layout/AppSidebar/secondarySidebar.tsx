import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { ModalComponent } from '@/components/Modals/modal';
import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiFolderPlus, BiPlus } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowDropright, IoIosArrowForward } from 'react-icons/io';

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
    <div className={`flex-none w-full`}>
      <div className={`flex-col mt-6 gap-4 flex`}>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-black-600'>Minhas pastas</h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<BiFolderPlus size={24} />}
            className='bg-neon-500 hover:bg-neon-600 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col'>
          {folders.map(folder => (
            <div className='flex flex-col'>
              <div
                className='w-full mb-2 flex justify-between items-center'
                onClick={() => {
                  openSubFolders(), setSelectedFolderId(folder.id);
                }}
              >
                <div className='flex gap-2 items-center'>
                {!openSubFolder ? <IoIosArrowForward /> : <IoIosArrowDown />}
                <h1 className='text-xl font-bold text-black-800'>
                  {folder.name}
                </h1>
                </div>
                <div className='flex gap-4 items-center justify-between'>
                  <ButtonComponent
                    onClick={onOpenAddItem}
                    icon={<BiPlus size={24} />}
                    className='bg-neon-500 hover:bg-neon-600 text-white rounded-full'
                  />
                </div>
              </div>

              {openSubFolder && folder.id === selectedFolderId && (
                  <div className='flex justify-center'>
                    {folder.items.map((item, index) => (
                    <div>
                      <h1 className='text-lg font-semibold text-black-800'>{item}</h1>
                    </div>
                  ))}
                  </div>
              )}
            </div>
          ))}

          {/* {folders.map(folder => (
            <li key={folder.id} onClick={() => setSelectedFolderId(folder.id)}>
              {folder.name}
              {openSubFolder && (
                folder.id === selectedFolderId && (
                  <ul>
                    {folder.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </li>
          ))} */}

          {/* <div className='w-full flex flex-col gap-2'>
            {openSubFolder &&
              navigateListSidebar.map(item => (
                <div
                  className={`
                    ${router.pathname === item.link ? 'bg-neon-500 text-white' : 'bg-transparent'}
                    ${darkMode ? 'bg-neon-600 bg-opacity-35 text-neon-400' : ''}
                    transition duration-300 
                    hover:bg-neon-400  
                    hover:text-white 
                    text-center 
                    w-full 
                    rounded-e-xl 
                    flex gap-2
                    items-center justify-center
                    p-2 cursor-pointer
                  `}
                  key={`${item.name}`}
                  onClick={() => router.push(item.link)}
                >
                  <a
                    className={`
                      text-center 
                      items-center 
                      justify-center 
                      flex gap-2
                      text-md
                    `}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
          </div> */}
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
