import { useContextGlobal } from "@/components/Context";
import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { ModalInstallPWA } from "@/utils/modals/pwa/pwa";
import { Box, Flex } from "@chakra-ui/react";
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const { darkMode } = useTheme();

  const {
    user,
    installPrompt,
    isOpenModal,
    setIsOpenModal,
    handleInstall,
    onClose
  } = useContextGlobal();

  return (
    <div className={`${darkMode ? "bg-neon-950" : "bg-neon-50"}`}>

      {installPrompt && (
        <ModalInstallPWA
          isOpenModal={isOpenModal}
          onClose={onClose}
          handleInstall={handleInstall}
        />
      )}
        <NeonNote />
    </div>
  );
}
