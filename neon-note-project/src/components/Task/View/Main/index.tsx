import {
  ModalContentComponent,
  ModalRootComponent,
} from '@/components/common/modal';
import { useContextGlobal } from '@/Context';
import { MockProps } from '@/utils/mockFolders';
import { handleNavigation } from '@/utils/navigationProgress';
import { truncateText } from '@/utils/truncate';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import { FcFolder } from 'react-icons/fc';
import { GrProjects } from 'react-icons/gr';
import { ModalNameProject } from './dialogs/createProject';
import { useTaskProjects } from '../../ViewModel/useTaskProjects';
import { useContextTaskData } from '../../Context/TaskContext/TaskContext';

interface MainScreenProps {
  pasta: MockProps | undefined;
}

export function MainScreenTaskComponent({ pasta }: MainScreenProps) {
  const {
    open: isOpenModalCreateProject,
    onOpen: onOpenModalCreateProject,
    onClose: onCloseModalCreateProject,
  } = useDisclosure();
  const { darkMode } = useContextGlobal();
  const { listProjects } = useTaskProjects();
  const router = useRouter();

  const projectName = listProjects.find(project => project.id === pasta?.id)?.projectName;

  return (
    <div className='p-4 w-full h-72'>
      <div
        className={`flex w-full items-center gap-2 mb-4 ${darkMode ? 'text-white' : 'text-black-800'}`}
      >
        <FcFolder size={32} />
        <h1 className={`text-2xl  font-bold`}>
          {truncateText(pasta?.folderName || '', 60)}
        </h1>
      </div>
      <div
        className={`w-full h-full p-4 flex rounded shadow ${darkMode ? 'bg-neon-900 bg-opacity-30' : 'bg-gray-100'}`}
      >
        <div className='flex gap-2 flex-col w-full'>
          <div
            className={`${darkMode ? 'text-white' : 'text-black-700'} w-full mb-4 flex justify-between`}
          >
            <div className='flex items-center gap-2'>
              <GrProjects size={20} />
              <h1 className={`text-xl font-semibold text-left`}>
                Meus projetos
              </h1>
            </div>

            <div className=''>
              <Image
                src={'/tasks/organize_projects.svg'}
                alt='Imagem'
                width={200}
                height={200}
              />
            </div>
          </div>
          <SimpleGrid columns={3} justifyContent={'center'} gap={4}>
            <ModalRootComponent
              isOpen={isOpenModalCreateProject}
              onClose={onCloseModalCreateProject}
            >
              <>
                <div
                  key={pasta?.id}
                  onClick={onOpenModalCreateProject}
                  className={`
                ${darkMode ? 'bg-neon-900' : 'bg-white'}
                w-72 h-44
               shadow-xl rounded-lg border-4  border-l-neon-400 border-b-neon-400 border-t-neon-500 border-r-neon-500
              cursor-pointer hover:bg-neon-500 transition duration-300 hover:text-white text-neon-400  
              `}
                >
                  <div
                    className={`${darkMode ? 'text-white' : ''}  hover:text-white flex justify-center mt-12 items-center flex-col`}
                  >
                    <BiPlus size={44} className='animate-bounce' />
                    <h1 className='font-semibold text-xl'>Criar projeto</h1>
                  </div>
                </div>

                <ModalContentComponent
                  content={
                    <ModalNameProject onClose={onCloseModalCreateProject} />
                  }
                />
              </>
            </ModalRootComponent>
            {listProjects.map((project, idx) => (
              <div
              key={idx}
              onClick={() =>
                handleNavigation(
                  router,
                  `/tasks/${project.id}/project/${project.id}`
                )
              }
              className={`${darkMode ? 'bg-neon-900 hover:bg-opacity-15' : 'bg-white'} shadow-md w-72 h-44 rounded-lg p-2 hover:bg-neon-400 hover:text-white text-black-600 border-4 border-l-neon-400 border-r-0 border-b-0 border-t-0 cursor-pointer duration-300`}
            >
              <p className={`text-lg ${darkMode ? 'text-white' : ''}`}>
                {project.projectName}
              </p>
            </div>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}
