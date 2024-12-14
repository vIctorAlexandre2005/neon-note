import { ButtonComponent } from "@/components/common/Button";
import { useTheme } from "@/components/ThemeDark";
import { useContextGlobal } from "@/Context";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";
import { FaFolder, FaFolderPlus } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import { AddFolderModal } from "../modals/addFolter";
import { DeleteFolderModal } from "../modals/deleteFolder";
import { useSecondarySidebarHome } from "@/hooks/useSecondarySidebar/sidebarHome";
import { Fragment } from "react";
import { ListFolders } from "./listFolders";
import { FcFolder } from "react-icons/fc";
import { RiFolderCloseFill } from "react-icons/ri";
import { HashLoader } from "react-spinners";


export function SidebarHome() {
  const router = useRouter();

  const { darkMode } = useTheme();

  const {
    folders,
    newFolderName,
    setNewFolderName,
    handleAddFolder,
    selectedFolderId,
    deleteFolder,
    handleItemClick,
    selectedItem
  } = useSecondarySidebarHome();

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
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-black-400' : 'text-black-700'}`}>Minhas pastas</h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<FaFolderPlus size={24} />}
            className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col gap-1 p-2'>
          {folders.length > 0 ?
            folders.map((folder, idx) => (
              <Fragment key={idx}>
                <ListFolders 
                  darkMode={darkMode}
                  folder={folder}
                  handleItemClick={handleItemClick}
                  selectedFolderId={selectedFolderId}
                  onOpenDeleteFolder={onOpenDeleteFolder}
                />
              </Fragment>
            )) : (
              <div className={`flex flex-col gap-1 items-center p-2 ${darkMode ? 'text-neon-800 opacity-80' : 'text-black-600'}`}>
                <RiFolderCloseFill size={50} />
                <div className="flex gap-2 items-center">
                  <h1 className={`text-md font-semibold ${darkMode ? 'text-black-300' : 'text-black-600'}`}>
                    Nenhuma pasta encontrada
                  </h1>
                  <HashLoader size={24} color={darkMode ? '#042488' : '#0949ee'} />
                </div>
              </div>
            )}
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
          selectedFolderId={selectedFolderId as string}
          isOpenDeleteFolder={isOpenDeleteFolder}
          deleteFolder={deleteFolder}
          onCloseDeleteFolder={onCloseDeleteFolder}
        />
      )}
    </div>
  );
}