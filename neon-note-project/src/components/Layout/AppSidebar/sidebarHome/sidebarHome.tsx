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
import { ThereIsNoFolder } from "@/components/common/ThereIsNoFolder";
import { ListFoldersDesktop } from "./listFoldersDesktop";
import { ClipLoader } from "react-spinners";


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
    selectedItem,
    loadingFolders,
    setLoadingFolders
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
          {loadingFolders && (
            <div className="flex items-center justify-center">
              <ClipLoader size={24} color="#36d7b7" />
            </div>
          )}
          
          {folders.length > 0 ?
            folders.map((folder, idx) => (
              <Fragment key={idx}>
                <ListFoldersDesktop
                  darkMode={darkMode}
                  folder={folder}
                  handleItemClick={handleItemClick}
                  selectedFolderId={selectedFolderId}
                  onOpenDeleteFolder={onOpenDeleteFolder}
                />
              </Fragment>
            )) : (
              !loadingFolders && <ThereIsNoFolder />
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