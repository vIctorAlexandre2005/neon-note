import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import FadeIn from '@/components/Effects/FadeIn';
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
import { AddFolderModal } from './modals/addFolter';
import { AddFolderItemModal } from './modals/addItemFolder';
import { useSecondarySidebar } from '@/hooks/useSecondarySidebar';
import { useContextGlobal } from '@/Context';
import { HiDocumentText, HiOutlineDocumentText } from 'react-icons/hi2';
import { BsTrash, BsTrash2 } from 'react-icons/bs';
import { DeleteFolderModal } from './modals/deleteFolder';

interface SidebarProps {
  darkMode: boolean;
}

export function SecondarySidebar({ darkMode }: SidebarProps) {
  const router = useRouter();

  const {
    folders,
    // openSubFolder,
    // setOpenSubFolder,
    newFolderName,
    setNewFolderName,
    handleAddFolder,
    // handleAddItem,
    // newItemName,
    // openSubFolders,
    selectedFolderId,
    setSelectedFolderId,
    // setNewItemName,
    deleteFolder,
    // handleDeleteItem,
  } = useSecondarySidebar();

  const { handleItemClick, selectedItem } = useContextGlobal();

  const {
    isOpen: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteFolder,
    onOpen: onOpenDeleteFolder,
    onClose: onCloseDeleteFolder,
  } = useDisclosure();

  return (
    <div
      className={`flex-none w-full ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className={`flex-col mt-6 gap-4 flex`}>
        <div className='flex justify-between p-2 items-center'>
          <h1 className='text-2xl font-bold text-black-600'>Minhas pastas</h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<FaFolderPlus size={24} />}
            className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <div
            className='w-full mb-4 pl-4 flex justify-between items-center'
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

          {folders.length > 0 &&
            folders.map(folder => (
              <div className='flex flex-col pl-4'>
                <div
                  className='w-full mb-2 flex justify-between items-center'
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
                      setSelectedFolderId(folder.id);
                      handleItemClick(folder.name);
                    }}
                  >
                    <div className='flex gap-2 items-center'>
                      <FaFolder size={18} />
                      <h1 className={`text-md font-bold`}>{folder.name}</h1>
                    </div>
                    <ButtonComponent
                      onClick={onOpenDeleteFolder}
                      icon={<BsTrash size={18} />}
                      className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
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

      {isOpenDeleteFolder && (
        <DeleteFolderModal
          selectedFolderId={selectedFolderId as number}
          isOpenDeleteFolder={isOpenDeleteFolder}
          deleteFolder={deleteFolder}
          onCloseDeleteFolder={onCloseDeleteFolder}
        />
      )}
    </div>
  );
}
