import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { ModalComponent } from '@/components/Modals/modal';
import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiFolderPlus } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

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

        <div className='flex flex-col' onClick={openSubFolders}>
          {/* {folders.map(folder => (
            <div className='w-full mb-2 flex justify-between items-center'>
            <h1 className='text-xl font-bold text-black-800'>
                {folder.name}
            </h1>
            {!openSubFolder ? <IoIosArrowBack /> : <IoIosArrowDown />}
          </div>
          ))} */}

          {folders.map(folder => (
            <li key={folder.id} onClick={() => setSelectedFolderId(folder.id)}>
              {folder.name}
              {folder.id === selectedFolderId && (
                <ul>
                  {folder.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <div style={{ padding: '1rem' }}>
            {selectedFolderId !== null ? (
              <>
                <input
                  type='text'
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  placeholder='Nome do novo item'
                />
                <button onClick={handleAddItem}>Adicionar Item</button>
              </>
            ) : (
              <p>Selecione uma pasta para adicionar itens</p>
            )}
          </div>

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
    </div>
  );
}
