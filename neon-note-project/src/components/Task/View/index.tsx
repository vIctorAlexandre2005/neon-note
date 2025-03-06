import { ClockLoader, HashLoader } from 'react-spinners';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { useSidebarCardsNote } from '../../Notes/ViewModel/useSidebarCardsNote';
import { SidebarTasksReuse } from '../../common/Task/SidebarTaskReuse';
import { useTaskSidebarAllFolders } from '../ViewModel/useTaskSidebarAllFolders';
import { useCardTasks } from '../ViewModel/useTasks';
import { ButtonComponent } from '@/components/common/Button';
import { PiDotsThreeBold, PiDotsThreeVerticalBold } from 'react-icons/pi';
import {
  PopoverContentComponent,
  PopoverRootComponent,
} from '@/components/common/Popover/PopoverModal';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTaskProjects } from '../ViewModel/useTaskProjects';
import { useRouter } from 'next/router';
import {
  ModalContentComponent,
  ModalRootComponent,
} from '@/components/common/modal';
import { ModalDeleteProject } from './Main/dialogs/project/deleteProject';
import { TbTrash } from 'react-icons/tb';
import { EditFolderModalTask } from './modal/editNameFolder';
import { EditProjectModalTask } from './Main/dialogs/project/editProject';

interface TaskProps {
  projectName: string | undefined;
}

export function TaskComponent({ projectName }: TaskProps) {
  const { foldersTask } = useTaskSidebarAllFolders();
  const { darkMode } = useContextGlobal();
  const {
    tasksToStartInProject,
    tasksInProgressInProject,
    tasksFinishedInProject,
  } = useCardTasks();

  const { 
    deleteTaskProject,
    editProject,
    editedNameProject,
    setEditedNameProject,
    isOpenModalEditProject,
    onOpenModalEditProject,
    onCloseModalEditProject,
  } = useTaskProjects();

  const [openPopoverMenuProject, setOpenPopoverMenuProject] = useState(false);
  function onOpenPopoverMenuProject() {
    setOpenPopoverMenuProject(!openPopoverMenuProject);
  };

  const {
    open: isOpenModalDeleteProject,
    onOpen: onOpenModalDeleteProject,
    onClose: onCloseModalDeleteProject,
  } = useDisclosure();

  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div className='flex flex-col h-full p-2'>
      <div className='flex p-2 justify-between items-center'>
        <h1
          className={`text-2xl ${darkMode ? 'text-black-100' : 'text-black-700'} mb-2 font-extrabold`}
        >
          {projectName?.toUpperCase()}
        </h1>
        <div>
          <PopoverRoot positioning={{ placement: 'left' }}>
            <PopoverTrigger>
              <ButtonComponent
                onClick={onOpenPopoverMenuProject}
                icon={<PiDotsThreeVerticalBold size={24} />}
                className='w-full bg-neon-400 bg-opacity-50 rounded-full hover:bg-neon-500 font-semibold transition duration-300 text-xl text-white'
              />
            </PopoverTrigger>

            <PopoverContent bg={darkMode ? '#0f172a' : 'white'}>
              <PopoverHeader>
                <h1
                  className={`text-xl ${darkMode ? 'text-black-100' : 'text-black-700'} font-extrabold`}
                >
                  Opções do projeto
                </h1>
              </PopoverHeader>

              <PopoverBody>
                <ModalRootComponent isOpen={isOpenModalEditProject} onClose={onCloseModalEditProject}>
                  <>
                  <ButtonComponent
                    text='Editar nome do projeto'
                    onClick={onOpenModalEditProject}
                    className={`font-semibold text-lg hover:bg-neon-400 hover:text-white w-full ${darkMode ? 'text-black-100' : 'text-black-700'}`}
                  />

                  <ModalContentComponent 
                    content={
                      <EditProjectModalTask 
                        onClose={onCloseModalEditProject}
                        onClick={() => editProject(projectId)} 
                        title='Edite o nome do projeto' 
                      />
                    } 
                  />
                  </>
                </ModalRootComponent>
                <ModalRootComponent
                  isOpen={isOpenModalDeleteProject}
                  onClose={onCloseModalDeleteProject}
                  size='lg'
                >
                  <>
                    <ButtonComponent
                      onClick={onOpenModalDeleteProject}
                      text='Excluir projeto'
                      icon={<TbTrash size={20} />}
                      className={`font-semibold gap-2 text-lg hover:bg-red-400 hover:text-white w-full ${darkMode ? 'text-black-100' : 'text-black-700'}`}
                    />

                    <ModalContentComponent
                      content={
                        <ModalDeleteProject
                          onClose={onCloseModalDeleteProject}
                          onClick={() => deleteTaskProject(projectId as string)}
                        />
                      }
                    />
                  </>
                </ModalRootComponent>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </div>
      </div>
      <div className='flex gap-6 h-full'>
        <SidebarTasksReuse
          arrayTasks={tasksToStartInProject}
          numberTasksStatus={tasksToStartInProject?.length}
          statusIcon={<HashLoader size={24} color='gray' />}
          statusTitle='A iniciar'
          statusIconColorBackground='gray'
          colorProgressStatusBar='blue'
          numberTasksStatusDone={0}
          thereIsNoButtonCreateTaskInSidebar={true}
        />

        <SidebarTasksReuse
          arrayTasks={tasksInProgressInProject}
          numberTasksStatus={tasksInProgressInProject?.length}
          statusIcon={<ClockLoader size={20} color='orange' />}
          statusTitle='Em progresso'
          statusIconColorBackground='orange'
          colorProgressStatusBar='orange'
          numberTasksStatusDone={4}
          thereIsNoButtonCreateTaskInSidebar={false}
        />

        <SidebarTasksReuse
          arrayTasks={tasksFinishedInProject}
          numberTasksStatus={tasksFinishedInProject?.length}
          statusIcon={<BiCheckCircle size={24} color='#02ad41' />}
          statusTitle='Finalizada'
          statusIconColorBackground='green'
          colorProgressStatusBar='green'
          numberTasksStatusDone={foldersTask?.length}
          thereIsNoButtonCreateTaskInSidebar={false}
        />
      </div>
    </div>
  );
}
