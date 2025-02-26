import { useContextGlobal } from '@/Context';
import { useRouter } from 'next/router';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import { MainScreenTaskComponent } from '@/components/Task/View/Main';
import FloatingParticles from '@/components/common/Effects/FloatingParticles';

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
      <FloatingParticles />
      <MainScreenTaskComponent pasta={pasta} />
    </div>
  )
}
