import { NeonNote } from '@/components/Notes/View';
import { useTheme } from '@/components/ThemeDark';
import { useContextGlobal } from '@/Context';
import { ModalInstallPWA } from '@/utils/modals/pwa/pwa';
import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  const { user } = useContextGlobal();

  return (
    <div className='h-full'>
      {user && <NeonNote />}

      {!user && null}
    </div>
  );
}
