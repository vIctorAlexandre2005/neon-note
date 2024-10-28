import { auth } from '@/services/firebase';
import { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
/* import { usePWA } from "@/utils/usePWA"; */
import { ContextData, defaultValueContextData } from '@/Interface/ContextData';
import { Loader } from '@/components/common/Loader';
import { useSecondarySidebar } from '@/hooks/useSecondarySidebar';

const ParamsProvider = createContext<ContextData>(defaultValueContextData);

const ParamsContext = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { setSelectedFolderId } = useSecondarySidebar();

  function handleItemClick(name: string) {
    setSelectedFolderId(name === 'All notes' ? 1 : null);
    console.log(name);
    setSelectedItem(name);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, [isMobile]);

  if (loading) {
    return <Loader />;
  }

  /* const installPrompt = usePWA(); */

  return (
    <ParamsProvider.Provider
      value={{
        user,
        /* installPrompt, */
        isMobile,
        loading,
        selectedItem,
        handleItemClick,
        setSelectedItem,
      }}
    >
      {children}
    </ParamsProvider.Provider>
  );
};

export const useContextGlobal = () => useContext(ParamsProvider);
export default ParamsContext;
