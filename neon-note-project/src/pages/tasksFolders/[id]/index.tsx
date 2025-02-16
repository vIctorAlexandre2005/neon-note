import { FcFolder } from 'react-icons/fc';
import { useContextGlobal } from '@/Context';
import { handleNavigation } from '@/utils/navigationProgress';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { BiArrowBack, BiFolder, BiPlus } from 'react-icons/bi';
import { GrProjects } from 'react-icons/gr';
import Image from 'next/image';
import { mockPastas } from '@/utils/mockFolders';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import { truncateText } from '@/utils/truncate';
import {
  ModalContentComponent,
  ModalRootComponent,
} from '@/components/common/modal';
import { MainScreenTaskComponent } from '@/components/Task/View/Main';

export default function MainTaskFolderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useContextGlobal();

  const { foldersTask } = useTaskSidebarAllFolders();

  const pasta = foldersTask.find(pasta => pasta.id === id);

  if (!pasta)
    return (
      <div className={`${darkMode ? 'text-white' : 'text-black-800'}`}>
        <h1>Oops! Pasta não encontrada :(</h1>
      </div>
    );

  return (
    <div className='w-full h-full overflow-auto p-2'>
      <MainScreenTaskComponent pasta={pasta} />
    </div>
  )
}
