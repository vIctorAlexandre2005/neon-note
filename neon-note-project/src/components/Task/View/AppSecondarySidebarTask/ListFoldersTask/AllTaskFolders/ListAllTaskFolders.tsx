import { CiFolderOn } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { ListFoldersTask } from "../..";
import { ThereIsNoFolder } from "@/components/common/ThereIsNoFolder";

interface PropsListNotFixedFolders {
  openNotFixedFolders: boolean;
  handleOpenNotFixedFolders: () => void;
  tasksFolders: any[];
  isLoadingTaskFolder: boolean;
  selectedTaskFolder: number | null;
  handleSelectFolderTask: (id: number, name: string) => void;
  onOpenDeleteFolder: () => void;
}

export function ListAllTaskFolders({
  openNotFixedFolders,
  handleOpenNotFixedFolders,
  tasksFolders,
  isLoadingTaskFolder,
  selectedTaskFolder,
  handleSelectFolderTask,
  onOpenDeleteFolder,
}: PropsListNotFixedFolders) {
  return (
    <div
      onClick={handleOpenNotFixedFolders}
      className='flex justify-between p-2 hover:bg-gray-500 hover:bg-opacity-30 transition-all cursor-pointer duration-300 items-center'
    >
      <div className='flex items-center gap-2'>
        <p className='text-lg font-semibold'>Pastas</p>
        <CiFolderOn size={20} />
      </div>
      {openNotFixedFolders ? (
        <IoMdArrowDropdown size={20} />
      ) : (
        <IoMdArrowDropleft size={20} />
      )}
      {openNotFixedFolders &&
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
  );
}
