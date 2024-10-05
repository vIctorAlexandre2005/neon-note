import { auth } from "@/services/firebase";
import { useRouter } from "next/router";
import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../Loader";
import { usePWA } from "@/utils/usePWA";
import { ContextData, defaultValueContextData } from "@/Interface/ContextData";

const ParamsProvider = createContext<ContextData>(defaultValueContextData);

const ParamsContext = ({ children }: { children: ReactNode }) => {
    const [user, loading] = useAuthState(auth as any);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {   
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
        };
    }, [isMobile]);

    function onClose() {
        setIsOpenModal(false);
    };

    const installPrompt = usePWA();

    if (loading) {
        return <Loader />
    };
    function handleInstall() {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                };
            });
        };
    };

    return (
        <ParamsProvider.Provider
            value={{
                user,
                installPrompt,
                isMobile,
            }}
        >
            {children}
        </ParamsProvider.Provider>
    );
};

export const useContextGlobal = () => useContext(ParamsProvider);
export default ParamsContext;
