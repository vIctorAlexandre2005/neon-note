import { useContextGlobal } from "@/components/Context";
import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { ModalInstallPWA } from "@/utils/modals/pwa/pwa";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  const {
    user,
  } = useContextGlobal();

  return (
    <div className={`${darkMode ? "bg-slate-950" : "bg-neon-50"} h-full`}>
        <NeonNote />
    </div>
  );
}
