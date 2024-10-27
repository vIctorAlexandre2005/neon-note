import { NeonNote } from '@/components/Notes/View';
import { useTheme } from '@/components/ThemeDark';
import { useContextGlobal } from '@/Context';
import { ModalInstallPWA } from '@/utils/modals/pwa/pwa';
import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  const { user, selectedItem } = useContextGlobal();

  return (
    <div className={`${darkMode ? 'bg-slate-950' : 'bg-black-50'} h-full`}>
      {user && <NeonNote />}

      {!user && null}
    </div>
  );
}
