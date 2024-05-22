import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { auth } from "@/services/firebase";
import { Box, Button, Img, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
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
      {installPrompt ? (
          <Modal isCentered isOpen={isOpenModal} onClose={onClose}>
            <ModalOverlay
              onClick={onClose}
              width={"100%"}
              height={"100%"}
              background={"#00000090"}
            />
            <ModalContent
              transition={"0.2s"}
              background={'white'}
              width={"24rem"}
            >
              <ModalHeader marginBottom={"2rem"} display={"flex"}
                alignItems={"center"} justifyContent={"center"}
              >
                <Box gap={"12px"} display={"flex"}
                  alignItems={"center"} justifyContent={"center"}
                >
                  <Text fontWeight={"600"} color={"#004aff"} fontSize={"1.1rem"}>
                    Tenha o Neon Note em seu dispositivo!
                  </Text>
                </Box>
              </ModalHeader>
              <ModalBody display={"flex"} justifyContent={"center"}>
                <Img src="/login.svg" height={180} width={180} />
              </ModalBody>
              <ModalFooter width={"100%"} marginTop={"1rem"}>
                <Button
                  width={"100%"}
                  padding={"0.5rem"}
                  border={"none"}
                  borderRadius={"6px"}
                  background={"#004aff"}
                  color={"white"}
                  fontWeight={"bold"}
                  onClick={handleInstall}
                  _hover={{ background: '#0229a6', transition: '0.3s' }}
                  gap={2}
                >
                  Baixar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          ''
        )}
      <NeonNote />
    </div>
  );
}
