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
import { useSecondarySidebarHome } from '@/hooks/useSecondarySidebar/sidebarHome';
import { useDisclosure } from '@chakra-ui/react';

const ParamsProvider = createContext<ContextData>(defaultValueContextData);

const ParamsContext = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string | null>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null | string>(null);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  function handleItemClick(id: number, nameFolder: string) {
    console.log(id, nameFolder);
    setSelectedItem(id === 1 ? 'Todas as anotações' : nameFolder);
    setSelectedFolderId(id);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
    }
  }, [isMobile]);

  if (loading) {
    return <Loader />;
  }

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
        selectedFolderId,
        setSelectedFolderId,
        isOpenModal,
        onOpenModal,
        onCloseModal,
      }}
    >
      {children}
    </ParamsProvider.Provider>
  );
};

export const useContextGlobal = () => useContext(ParamsProvider);
export default ParamsContext;
