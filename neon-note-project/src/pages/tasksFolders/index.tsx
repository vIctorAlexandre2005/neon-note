import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { TaskComponent } from '@/components/Task/View';
import { useTaskSidebarAllFolders } from '@/components/Task/hook/useFolders/useTaskSidebarAllFolders';
import { useContextGlobal } from '@/Context';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Tasks() {
  const router = useRouter();
  const { darkMode } = useContextGlobal();

  if (!router.query.id) {
    return (
      <div className='top-2/4 left-1/2 transform -translate-x-2/2 -translate-y-1/2 fixed'>
        <div className='flex flex-col gap-4 items-center animate-flute'>
          <Image
            src={'/tasks/undraw_folder.svg'}
            height={400}
            width={400}
            alt={'Imagem'}
            quality={100}
            loading='eager'
            priority
          />
          <p
            className={`${darkMode ? 'text-gray-200' : 'text-black-600'} text-2xl font-semibold`}
          >
            O segredo do sucesso? Organização e consistência!
          </p>
        </div>
      </div>
    );
  }
}
