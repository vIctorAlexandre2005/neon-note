import { useContextGlobal } from '@/Context';
import { useRouter } from 'next/router';
import { useTaskSidebarAllFolders } from '@/components/Task/hook/useFolders/useTaskSidebarAllFolders';
import { MainScreenTaskComponent } from '@/components/Task/View/Main';
import FloatingParticles from '@/components/common/Effects/FloatingParticles';
import Image from 'next/image';

export default function MainTaskFolderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useContextGlobal();

  const { foldersTask } = useTaskSidebarAllFolders();

  const folderId = foldersTask.find(folder => folder.id === id);

  if (!folderId)
    return (
      <div className='flex flex-col justify-center items-center mt-24'>
        <Image
          src={'/tasks/notFound.svg'}
          height={400}
          width={400}
          alt={'Imagem'}
        />
        <div className={`${darkMode ? 'text-white' : 'text-black-800'}`}>
          <h1 className='text-2xl mt-4 font-semibold'>
            Oops! Página não encontrada :(
          </h1>
        </div>
      </div>
    );

  return (
    <div className='w-full h-full overflow-auto p-2'>
      <FloatingParticles />
      <MainScreenTaskComponent folder={folderId} />
    </div>
  );
}
