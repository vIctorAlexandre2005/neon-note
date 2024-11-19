import { SecondarySidebar } from '@/components/Layout/AppSidebar/secondarySidebar';
import { NeonNote } from '@/components/Notes/View';
import { useTheme } from '@/components/ThemeDark';
import { useContextGlobal } from '@/Context';
import { ModalInstallPWA } from '@/utils/modals/pwa/pwa';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  const { user, selectedItem } = useContextGlobal();

  const router = useRouter();

  return (
    <div className={`${darkMode ? 'bg-slate-950' : 'bg-black-50'}`}>
      {user && (
        <div className='flex h-full'>
          <div
            className={`flex-1 ${router.pathname === '/login' || router.pathname === '/error' ? 'hidden' : 'flex sidebar flex-none xs:hidden md:flex md:w-24 lg:w-72'}`}
          >
            <SecondarySidebar darkMode={darkMode} />
          </div>
          <NeonNote />
        </div>
      )}

      {!user && null}
    </div>
  );
}
