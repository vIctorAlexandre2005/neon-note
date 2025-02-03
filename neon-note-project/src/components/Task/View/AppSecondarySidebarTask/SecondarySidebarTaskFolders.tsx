import { ButtonComponent } from '@/components/common/Button';
import { useContextGlobal } from '@/Context';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import { AddFolderModalTask } from '../modal/addFolder';
import { ListFixedFolders } from './ListFoldersTask/Fixed/fixedFolders';
import { ListAllTaskFolders } from './ListFoldersTask/AllTaskFolders/ListAllTaskFolders';
import {
  ModalContentComponent,
  ModalRootComponent,
} from '@/components/common/modal';
import nProgress from 'nprogress';
import { NextRouter, Router, useRouter } from 'next/router';
import { mockPastas } from '@/utils/mockFolders';

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
  } = useTaskSidebarAllFolders();

  const router = useRouter();

  const handleNavigation = ( router: NextRouter, url: string) => {
    nProgress.start(); // Inicia a barra de carregamento
    router.push(url).finally(() => nProgress.done()); // Finaliza quando a navegação termina
  };

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
          <ModalRootComponent
            isOpen={isOpenAddFolder}
            onClose={onCloseAddFolder}
          >
            <>
              <ButtonComponent
                onClick={onOpenAddFolder}
                icon={<FaFolderPlus size={24} />}
                className='bg-neon-400 hover:bg-neon-500 text-white rounded-full'
              />

              <ModalContentComponent
                content={
                  <AddFolderModalTask
                    darkMode={darkMode}
                    handleAddFolder={handleAddFolderTask}
                    isOpenAddFolder={isOpenAddFolder}
                    newFolderName={newTaskFolderName}
                    onCloseAddFolder={onCloseAddFolder}
                    setNewFolderName={setNewTaskFolderName}
                  />
                }
              />
            </>
          </ModalRootComponent>
        </div>

        <div className='flex flex-col gap-1 overflow-auto max-h-[calc(100vh-100px)]'>
          {/* Pastas fixas */}
          {/* <ListFixedFolders
            handleOpenFixedFolders={handleOpenFixedFolders}
            openFixedFolders={openFixedFolders}
            handleSelectFolderTask={handleSelectFolderTask}
            isLoadingTaskFolder={isLoadingTaskFolder}
            onOpenDeleteFolder={onOpenDeleteFolder}
            selectedTaskFolder={selectedTaskFolder}
            listTypeTask={tasksFixedFolders}
          />

          {/* Todas as pastas */}
          {/* <ListAllTaskFolders
            handleOpenNotFixedFolders={handleOpenNotFixedFolders}
            handleSelectFolderTask={handleSelectFolderTask}
            openNotFixedFolders={openNotFixedFolders}
            isLoadingTaskFolder={isLoadingTaskFolder}
            onOpenDeleteFolder={onOpenDeleteFolder}
            selectedTaskFolder={selectedTaskFolder}
            tasksAllFolders={tasksAllFolders}
            isOpenDeleteFolder={isOpenDeleteFolder}
            onCloseDeleteFolder={onCloseDeleteFolder}
            deleteFolderTask={deleteFolderTask}
          />  */}

          <div>
            <ul>
              {mockPastas.map(pasta => (
                <li
                  className='text-black-600'
                  key={pasta.id}
                  onClick={() => handleNavigation(router, `/tasks/${pasta.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {pasta.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
