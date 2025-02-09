import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { TaskComponent } from '@/components/Task/View';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Tasks() {
  const router = useRouter();

  if (!router.query.id) {
    return (
      <div className='top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed'>
        <Image 
          src={'/tasks/completed_projects.svg'} 
          height={400} 
          width={400} 
          alt={'Imagem'}
          quality={80}
          loading='eager'
          className='animate-flute'
          priority
        />
      </div>
    );
  };
}
