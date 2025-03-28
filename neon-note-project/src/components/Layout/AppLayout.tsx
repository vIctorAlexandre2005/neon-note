import { useEffect } from 'react';
import { NoteHeader } from './AppHeader/header';
import { Sidebar } from './AppSidebar/sidebar';
import { useRouter } from 'next/router';
import { useContextGlobal } from '@/Context';
import { Loader } from '../common/Loader';
import { SecondarySidebar } from './AppSidebar/secondarySidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { darkMode, setDarkMode } = useContextGlobal();
  const { user, loading } = useContextGlobal();

  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!user && router.pathname !== '/login') {
    router.push('/login');
    return null;
  }

  useEffect(() => {
    const darkModeItem = localStorage.getItem('darkMode');
    if (darkModeItem) {
      setDarkMode(JSON.parse(darkModeItem));
    }
  }, []);

  return (
    <div
      className={`flex flex-col w-full h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div className='flex w-full h-full'>
        <div
          className={`${router.pathname === '/login' || router.pathname === '/error' ? 'hidden' : 'flex sidebar flex-none xs:hidden md:flex md:w-24 lg:w-24'}`}
        >
          <Sidebar darkMode={darkMode} />
        </div>

        <div
          className={`${router.pathname === '/login' || router.pathname === '/error' ? 'hidden' : `sidebar xs:hidden tabletLandscape:flex flex-none w-72`}`}
        >
          <SecondarySidebar />
        </div>
        <div
          className={`flex-col flex flex-1 h-screen`}
        >
          <NoteHeader />
          {children && children}
        </div>
      </div>
    </div>
  );
}
