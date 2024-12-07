import { ButtonComponent } from "@/components/common/Button";
import { useTheme } from "@/components/ThemeDark";
import { useContextGlobal } from "@/Context";
import { useSecondarySidebar } from "@/hooks/useSecondarySidebar";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";
import { FaFolder, FaFolderPlus } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import { AddFolderModal } from "../modals/addFolter";
import { DeleteFolderModal } from "../modals/deleteFolder";
import { IoAdd } from "react-icons/io5";

export function SidebarTasks() {
    const router = useRouter();

  const { darkMode } = useTheme();

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
      className={`flex-none w-full shadow-xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className={`flex-col mt-6 gap-4 flex`}>
        <div className='flex justify-between p-2 items-center'>
          <h1 className='text-xl font-bold text-black-600'>Minhas Tarefas</h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<IoAdd size={18} />}
            className='bg-neon-400 p-2 hover:bg-neon-500 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col gap-1'>

          {folders.length > 0 &&
            folders.map(folder => (
              <div className='flex flex-col pl-4'>
                <div
                  className='w-full mb-2 flex justify-between items-center'
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