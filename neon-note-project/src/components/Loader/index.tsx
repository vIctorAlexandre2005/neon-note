import { Flex } from "@chakra-ui/react";
import { PulseLoader } from "react-spinners";
import { useTheme } from "../ThemeDark";

export function Loader() {

    const { darkMode } = useTheme();

    return (
        <div className={`flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed ${darkMode ? "bg-slate-900" : "bg-neon-50"}`}>
            <PulseLoader size={30} color="#004aff" />
        </div>
    );
}