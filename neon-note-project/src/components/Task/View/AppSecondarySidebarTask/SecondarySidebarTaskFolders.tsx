import { ButtonComponent } from '@/components/common/Button';
import { useContextGlobal } from '@/Context';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsTrash } from 'react-icons/bs';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import { AddFolderModal } from '../../../Layout/AppSidebar/modals/addFolter';
import { DeleteFolderModal } from '../../../Layout/AppSidebar/modals/deleteFolder';
import { useSecondarySidebarTask } from '@/components/Task/ViewModel/useSidebarTask';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { ClipLoader } from 'react-spinners';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { truncateText } from '@/utils/truncate';

export function SecondarySidebarTaskFolders() {
  
  const { darkMode } = useContextGlobal();
  const {
    tasksFolders,
    isLoadingTaskFolder,
    selectedTaskFolder,
    handleAddFolderTask,
    deleteFolderTask,
    newTaskFolderName,
    setNewTaskFolderName
  } = useSecondarySidebarTask();

  const { handleItemClick } = useContextNoteData();

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

        <div className='flex flex-col gap-1 overflow-auto max-h-[calc(100vh-115px)]'>
          {isLoadingTaskFolder && (
            <div className='flex justify-center items-center'>
              <ClipLoader size={20} color='#1e40af' />
            </div>
          )}

          {tasksFolders.length > 0
            ? tasksFolders.map(folder => (
                <div className='flex flex-col pl-4'>
                  <div
                    className='w-full mb-2 flex justify-between items-center'
                    onClick={() => handleItemClick(folder.id, folder.name)}
                  >
                    <div
                      className={`
                      flex gap-2 items-center justify-between cursor-pointer
                      ${
                        selectedTaskFolder === folder.id && darkMode
                          ? 'bg-neon-800 bg-opacity-50 text-neon-200' // quando a pasta for selecionada e estiver modo escuro
                          : selectedTaskFolder === folder.id && !darkMode
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
                        <h1 className={`text-md font-bold`}>{truncateText(folder.name, 30)}</h1>
                      </div>
                      <ButtonComponent
                        onClick={onOpenDeleteFolder}
                        icon={<BsTrash size={18} />}
                        className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              ))
            : !isLoadingTaskFolder && <ThereIsNoFolder />}
        </div>
      </div>
      {isOpenAddFolder && (
        <AddFolderModal
          darkMode={darkMode}
          handleAddFolder={handleAddFolderTask}
          isOpenAddFolder={isOpenAddFolder}
          newFolderName={newTaskFolderName}
          onCloseAddFolder={onCloseAddFolder}
          setNewFolderName={setNewTaskFolderName}
        />
      )}

      {isOpenDeleteFolder && (
        <DeleteFolderModal
          selectedFolderId={selectedTaskFolder as number}
          isOpenDeleteFolder={isOpenDeleteFolder}
          deleteFolder={deleteFolderTask as any}
          onCloseDeleteFolder={onCloseDeleteFolder}
        />
      )}
    </div>
  );
}
