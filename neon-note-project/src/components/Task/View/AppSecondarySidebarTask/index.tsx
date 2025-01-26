import { ButtonComponent } from '@/components/common/Button';
import FadeIn from '@/components/common/Effects/FadeIn';
import { useContextGlobal } from '@/Context';
import { truncateText } from '@/utils/truncate';
import { BsTrash } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react';
import { MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DropDownFolderTasks } from './ListFoldersTask/DropDown';

interface PropsListFoldersTask {
  isLoadingTaskFolder: boolean;
  listTypeTask: any[];
  selectedTaskFolder: number | null;
  onOpenDeleteFolder: () => void;
  handleSelectFolderTask: (id: number, name: string) => void;
}

export function ListFoldersTask({
  isLoadingTaskFolder,
  listTypeTask,
  selectedTaskFolder,
  handleSelectFolderTask,
  onOpenDeleteFolder,
}: PropsListFoldersTask) {
  const { darkMode } = useContextGlobal();

  const [openDrowpDown, setOpenDrowpDown] = useState(false);

  function handleOpenDropDown() {
    setOpenDrowpDown(!openDrowpDown);
  }

  return (
    <div className='flex flex-col p-2 gap-1'>
      {isLoadingTaskFolder && (
        <div className='flex justify-center items-center'>
          <ClipLoader size={20} color='#1e40af' />
        </div>
      )}

      <FadeIn>
        {listTypeTask &&
          listTypeTask.map(folder => (
            <div className='flex flex-col'>
              <div
                className='w-full mb-2 flex justify-between items-center'
                onClick={() => handleSelectFolderTask(folder.id, folder.name)}
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
                    <h1 className={`text-md font-bold`}>
                      {truncateText(folder.name, 30)}
                    </h1>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <ButtonComponent
                      onClick={onOpenDeleteFolder}
                      icon={<BsTrash size={18} />}
                      className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
                    />
                        <ButtonComponent
                          onClick={handleOpenDropDown}
                          icon={<RxDotsHorizontal size={18} />}
                          className={`hover:bg-neon-500 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
                        />

                        {openDrowpDown && (
                          <DropDownFolderTasks />
                        )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </FadeIn>
    </div>
  );
}
