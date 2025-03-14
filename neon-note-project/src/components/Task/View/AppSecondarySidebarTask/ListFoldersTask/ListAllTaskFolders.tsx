import { CiFolderOn } from 'react-icons/ci';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { useContextGlobal } from '@/Context';
import { mockPastas } from '@/utils/mockFolders';
import { ListFoldersTask } from '..';

interface PropsListNotFixedFolders {
  openNotFixedFolders: boolean;
  handleOpenNotFixedFolders: () => void;
  tasksAllFolders: any[];
  isLoadingTaskFolder: boolean;
  selectedTaskFolder: string | null;
  handleSelectFolderTask: (id: string) => void;
  onOpenDeleteFolder: () => void;
  isOpenDeleteFolder: boolean;
  onCloseDeleteFolder: () => void;
  deleteFolderTask: (id: string | string[] | undefined) => void;
  foldersTask: any[];
  id: string | string[] | undefined;
  handleEditFolderTask: (id: string | string[] | undefined) => void;
}

export function ListAllTaskFolders({
  openNotFixedFolders,
  handleOpenNotFixedFolders,
  tasksAllFolders,
  isLoadingTaskFolder,
  selectedTaskFolder,
  handleSelectFolderTask,
  isOpenDeleteFolder,
  onCloseDeleteFolder,
  deleteFolderTask,
  onOpenDeleteFolder,
  id,
  foldersTask,
  handleEditFolderTask,
}: PropsListNotFixedFolders) {
  const { darkMode } = useContextGlobal();

  return (
    <div>
      <div className='flex p-2 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all cursor-pointer duration-300 gap-2 items-center justify-between'>
        <div
          onClick={handleOpenNotFixedFolders}
          className={`flex gap-2 items-center w-full ${darkMode ? 'text-black-100' : 'text-black-700'}`}
        >
          <p className='text-lg font-semibold'>Todas as pastas</p>
          <CiFolderOn size={20} />
        </div>

        <div>
          {openNotFixedFolders ? (
            <IoMdArrowDropdown color={darkMode ? '#fff' : '#000'} size={20} />
          ) : (
            <IoMdArrowDropleft color={darkMode ? '#fff' : '#000'} size={20} />
          )}
        </div>
      </div>

      <div>
        {openNotFixedFolders &&
          (foldersTask?.length > 0 ? (
            <ListFoldersTask
              isLoadingTaskFolder={isLoadingTaskFolder}
              listTypeTask={foldersTask}
              selectedTaskFolder={selectedTaskFolder}
              handleSelectFolderTask={handleSelectFolderTask}
              onOpenDeleteFolder={onOpenDeleteFolder}
              isOpenDeleteFolder={isOpenDeleteFolder}
              onCloseDeleteFolder={onCloseDeleteFolder}
              deleteFolderTask={deleteFolderTask}
              handleEditFolderTask={handleEditFolderTask}
              id={id}
            />
          ) : (
            <ThereIsNoFolder />
          ))}
      </div>
    </div>
  );
}
