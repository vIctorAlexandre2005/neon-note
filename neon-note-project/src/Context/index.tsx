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
import { ContextData, defaultValueContextData } from '@/Interface/ContextData';
import { Loader } from '@/components/common/Loader';

const ParamsProvider = createContext<ContextData>(defaultValueContextData);

const ParamsContext = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
    }
  }, [isMobile]);

  if (loading) {
    return <Loader />;
  };

  return (
    <ParamsProvider.Provider
      value={{
        user,
        isMobile,
        loading,
      }}
    >
      {children}
    </ParamsProvider.Provider>
  );
};

export const useContextGlobal = () => useContext(ParamsProvider);
export default ParamsContext;
