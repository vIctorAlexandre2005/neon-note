/* import { InstallPromptEvent } from "@/Interface/pwa";
import { useEffect, useState } from "react";

export function usePWA() {
    const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);

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

    return installPrompt;
} */
