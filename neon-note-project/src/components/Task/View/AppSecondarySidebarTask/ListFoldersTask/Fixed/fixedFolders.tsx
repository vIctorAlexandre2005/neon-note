import { BsPinAngle } from 'react-icons/bs';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { ListFoldersTask } from '../..';
import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { useContextGlobal } from '@/Context';

interface PropsListFixedFolders {
  openFixedFolders: boolean;
  handleOpenFixedFolders: () => void;
  listTypeTask: any[];
  isLoadingTaskFolder: boolean;
  selectedTaskFolder: string | null;
  handleSelectFolderTask: (id: string) => void;
  onOpenDeleteFolder: () => void;
}

export function ListFixedFolders({
  openFixedFolders,
  handleOpenFixedFolders,
  listTypeTask,
  isLoadingTaskFolder,
  selectedTaskFolder,
  handleSelectFolderTask,
  onOpenDeleteFolder,
}: PropsListFixedFolders) {
  const { darkMode } = useContextGlobal();

  return (
    <div onClick={handleOpenFixedFolders}>
      <div className='flex p-2 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all cursor-pointer duration-300 gap-2 items-center justify-between'>
        <div
          className={`flex gap-2 items-center ${darkMode ? 'text-black-100' : 'text-black-700'}`}
        >
          <p className='text-lg font-semibold'>Fixado</p>
          <BsPinAngle size={20} />
        </div>

        <div>
          {openFixedFolders ? (
            <IoMdArrowDropdown color={darkMode ? '#fff' : '#000'} size={20} />
          ) : (
            <IoMdArrowDropleft color={darkMode ? '#fff' : '#000'} size={20} />
          )}
        </div>
      </div>

      <div>
        {openFixedFolders &&
          (listTypeTask?.length > 0 ? (
            <ListFoldersTask
              deleteFolderTask={() => {}}
              isOpenDeleteFolder={false}
              onCloseDeleteFolder={() => {}}
              isLoadingTaskFolder={isLoadingTaskFolder}
              listTypeTask={listTypeTask}
              selectedTaskFolder={selectedTaskFolder}
              handleSelectFolderTask={handleSelectFolderTask}
              onOpenDeleteFolder={onOpenDeleteFolder}
              id={''}
            />
          ) : (
            <ThereIsNoFolder />
          ))}
      </div>
    </div>
  );
}
