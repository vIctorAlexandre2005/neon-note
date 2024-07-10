import { auth } from "@/services/firebase";
import { VariablesContextType, defaultValue } from "@/utils/interface";
import { InstallPromptEvent } from "@/utils/interface/pwa";
import { useRouter } from "next/router";
import {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import { useAuthState } from "react-firebase-hooks/auth";

const ParamsProvider = createContext<VariablesContextType>(defaultValue);

const ParamsContext = ({ children }: { children: ReactNode }) => {
    const [user] = useAuthState(auth as any);
    const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

    function onClose() {
        setIsOpenModal(false);
    }

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const beforeInstallPromptHandler = (event: Event) => {
                event.preventDefault();
                setInstallPrompt(event as InstallPromptEvent);
            };

            window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

            window.addEventListener('appinstalled', () => {
                console.log('App installed');
            });

            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then((registration) => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, (err) => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });

            return () => {
                window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
            };
        }
    }, []);

    function handleInstall() {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setInstallPrompt(null);
            });
        }
    }
    return (
        <ParamsProvider.Provider
            value={{
                user,
                installPrompt,
                isOpenModal,
                setIsOpenModal,
                handleInstall,
                onClose
            }}
        >
            {children}
        </ParamsProvider.Provider>
    );
};

export const useContextGlobal = () => useContext(ParamsProvider);
export default ParamsContext;
