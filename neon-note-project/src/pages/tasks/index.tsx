import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { TaskComponent } from '@/components/Task/View';
import { useTaskSidebarAllFolders } from '@/components/Task/ViewModel/useTaskSidebarAllFolders';
import { useRouter } from 'next/router';
import { mockPastas } from './[id]';
import nProgress from 'nprogress';

export default function Tasks() {
  // const { selectedTaskFolder } = useTaskSidebarAllFolders();

  // if (selectedTaskFolder) {
  //   return <TaskComponent />
  // };

  // if (!selectedTaskFolder) {
  //   return (
  //     <div className='top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed'>
  //       <ThereIsNoFolder />
  //     </div>
  //   );
  // };

  const router = useRouter();

  const handleNavigation = (url: string) => {
      nProgress.start(); // Inicia a barra de carregamento
      router.push(url).finally(() => nProgress.done()); // Finaliza quando a navegação termina
  };

  return (
    <div>
      <h1>Pastas</h1>
      <ul>
        {mockPastas.map(pasta => (
          <li
            className='text-black-600'
            key={pasta.id}
            onClick={() => handleNavigation(`/tasks/${pasta.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {pasta.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
