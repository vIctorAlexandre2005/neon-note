import { Flex } from "@chakra-ui/react";
import { PulseLoader } from "react-spinners";

export function Loader() {
    return (
        <Flex w={"100%"} h={"100vh"} bg={"neon-50"} justify={"center"} align={"center"}>
            <PulseLoader size={30} color="#004aff" />
        </Flex>
    );
}