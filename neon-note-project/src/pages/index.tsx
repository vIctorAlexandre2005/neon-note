import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { auth } from "@/services/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoonLoader } from "react-spinners";

interface InstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function Home() {
  const { darkMode }: { darkMode: boolean } = useTheme();
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(true);

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
    <div className={`${darkMode ? 'bg-black-900' : 'bg-neon-50'}`}>
      <NeonNote />
    </div>
  );
}
