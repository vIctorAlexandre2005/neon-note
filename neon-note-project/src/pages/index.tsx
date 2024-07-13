import { useContextGlobal } from "@/components/Context";
import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { ModalInstallPWA } from "@/utils/modals/pwa/pwa";
import { Box } from "@chakra-ui/react";
import { PulseLoader } from "react-spinners";

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

  if(!user) {
    return (
      <Box justifyContent={"center"} display={"flex"} alignItems={"center"} mt={"16rem"}>
        <PulseLoader size={40} color='#004aff' />
      </Box>
    )
  }

  return (
    <div className={`${darkMode ? "bg-black-900" : "bg-neon-50"}`}>
      {user && (
        <NeonNote />
      )}

      {installPrompt && (
        <ModalInstallPWA
          isOpenModal={isOpenModal}
          onClose={onClose}
          handleInstall={handleInstall}
        />
      )}
    </div>
  );
}
