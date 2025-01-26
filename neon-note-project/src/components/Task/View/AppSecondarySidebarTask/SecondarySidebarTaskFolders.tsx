import { ButtonComponent } from '@/components/common/Button';
import { useContextGlobal } from '@/Context';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsFillPinAngleFill, BsPinAngle, BsTrash } from 'react-icons/bs';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import { AddFolderModal } from '../../../Layout/AppSidebar/modals/addFolter';
import { DeleteFolderModal } from '../../../Layout/AppSidebar/modals/deleteFolder';
import { useSecondarySidebarTask } from '@/components/Task/ViewModel/useSecondarySidebarTask';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { ClipLoader } from 'react-spinners';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { truncateText } from '@/utils/truncate';
import { ListFoldersTask } from '.';
import { AddFolderModalTask } from '../modal/addFolder';
import { DeleteFolderModalTask } from '../modal/deleteFolder';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { CiFolderOn } from 'react-icons/ci';
import { ListFixedFolders } from './ListFoldersTask/Fixed/fixedFolders';
import { ListAllTaskFolders } from './ListFoldersTask/AllTaskFolders/ListAllTaskFolders';

export function SecondarySidebarTaskFolders() {
  const { darkMode } = useContextGlobal();
  const {
    tasksAllFolders,
    isLoadingTaskFolder,
    selectedTaskFolder,
    handleAddFolderTask,
    deleteFolderTask,
    newTaskFolderName,
    setNewTaskFolderName,
    handleSelectFolderTask,
    isOpenAddFolder,
    isOpenDeleteFolder,
    onCloseAddFolder,
    onCloseDeleteFolder,
    onOpenAddFolder,
    onOpenDeleteFolder,
    openFixedFolders,
    openNotFixedFolders,
    handleOpenNotFixedFolders,
    handleOpenFixedFolders,
    tasksFixedFolders,
    setTasksFixedFolders,
  } = useSecondarySidebarTask();

  return (
    <div
      className={`flex-none w-full shadow-xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className={`flex-col gap-2 flex`}>
        <div className='flex justify-between p-2 items-center'>
          <h1
            className={`text-xl font-bold ${darkMode ? 'text-black-400' : 'text-black-700'}`}
          >
            Minhas Pastas
          </h1>
          <ButtonComponent
            onClick={onOpenAddFolder}
            icon={<FaFolderPlus size={24} />}
            className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
          />
        </div>

        <div className='flex flex-col gap-1 overflow-auto max-h-[calc(100vh-100px)]'>
          {/* Pastas fixas */}
          <ListFixedFolders
            handleOpenFixedFolders={handleOpenFixedFolders}
            openFixedFolders={openFixedFolders}
            handleSelectFolderTask={handleSelectFolderTask}
            isLoadingTaskFolder={isLoadingTaskFolder}
            onOpenDeleteFolder={onOpenDeleteFolder}
            selectedTaskFolder={selectedTaskFolder}
            listTypeTask={tasksFixedFolders}
          />

          {/* Todas as pastas */}
          <ListAllTaskFolders
            handleOpenNotFixedFolders={handleOpenNotFixedFolders}
            handleSelectFolderTask={handleSelectFolderTask}
            openNotFixedFolders={openNotFixedFolders}
            isLoadingTaskFolder={isLoadingTaskFolder}
            onOpenDeleteFolder={onOpenDeleteFolder}
            selectedTaskFolder={selectedTaskFolder}
            tasksAllFolders={tasksAllFolders}
          />
        </div>
      </div>

      {isOpenAddFolder && ( // Modal para adicionar pasta
        <AddFolderModalTask
          darkMode={darkMode}
          handleAddFolder={handleAddFolderTask}
          isOpenAddFolder={isOpenAddFolder}
          newFolderName={newTaskFolderName}
          onCloseAddFolder={onCloseAddFolder}
          setNewFolderName={setNewTaskFolderName}
        />
      )}

      {isOpenDeleteFolder && ( // Modal para deletar pasta
        <DeleteFolderModalTask
          selectedFolderId={selectedTaskFolder as number}
          isOpenDeleteFolder={isOpenDeleteFolder}
          deleteFolder={deleteFolderTask as any}
          onCloseDeleteFolder={onCloseDeleteFolder}
        />
      )}
    </div>
  );
}
