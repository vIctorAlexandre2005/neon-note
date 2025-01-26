import { CiFolderOn } from 'react-icons/ci';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { ListFoldersTask } from '../..';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { useContextGlobal } from '@/Context';

interface PropsListNotFixedFolders {
  openNotFixedFolders: boolean;
  handleOpenNotFixedFolders: () => void;
  tasksAllFolders: any[];
  isLoadingTaskFolder: boolean;
  selectedTaskFolder: number | null;
  handleSelectFolderTask: (id: number, name: string) => void;
  onOpenDeleteFolder: () => void;
}

export function ListAllTaskFolders({
  openNotFixedFolders,
  handleOpenNotFixedFolders,
  tasksAllFolders,
  isLoadingTaskFolder,
  selectedTaskFolder,
  handleSelectFolderTask,
  onOpenDeleteFolder,
}: PropsListNotFixedFolders) {
  const { darkMode } = useContextGlobal();

  return (
    <div onClick={handleOpenNotFixedFolders}>
          <div className='flex p-2 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all cursor-pointer duration-300 gap-2 items-center justify-between'>
            <div className={`flex gap-2 items-center ${darkMode ? 'text-black-100' : 'text-black-700'}`}>
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
              (tasksAllFolders?.length > 0 ? (
                <ListFoldersTask
                  isLoadingTaskFolder={isLoadingTaskFolder}
                  listTypeTask={tasksAllFolders}
                  selectedTaskFolder={selectedTaskFolder}
                  handleSelectFolderTask={handleSelectFolderTask}
                  onOpenDeleteFolder={onOpenDeleteFolder}
                />
              ) : (
                <ThereIsNoFolder />
              ))}
          </div>
        </div>
  );
}
