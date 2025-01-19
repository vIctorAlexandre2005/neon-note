import { BsPinAngle } from 'react-icons/bs';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { ListFoldersTask } from '../..';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';

interface PropsListFixedFolders {
  openFixedFolders: boolean;
  handleOpenFixedFolders: () => void;
  tasksFolders: any[];
  isLoadingTaskFolder: boolean;
  selectedTaskFolder: number | null;
  handleSelectFolderTask: (id: number, name: string) => void;
  onOpenDeleteFolder: () => void;
}

export function ListFixedFolders({
  openFixedFolders,
  handleOpenFixedFolders,
  tasksFolders,
  isLoadingTaskFolder,
  selectedTaskFolder,
  handleSelectFolderTask,
  onOpenDeleteFolder,
}: PropsListFixedFolders) {
  return (
    <div onClick={handleOpenFixedFolders}>
      <div className='flex p-2 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all cursor-pointer duration-300 gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <p className='text-lg font-semibold'>Fixado</p>
          <BsPinAngle size={20} />
        </div>

        <div>
          {openFixedFolders ? (
            <IoMdArrowDropdown size={20} />
          ) : (
            <IoMdArrowDropleft size={20} />
          )}
        </div>
      </div>

      <div>
        {openFixedFolders &&
          (tasksFolders?.length > 0 ? (
            <ListFoldersTask
              isLoadingTaskFolder={isLoadingTaskFolder}
              tasksFolders={tasksFolders}
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
