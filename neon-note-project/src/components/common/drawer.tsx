import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from "@chakra-ui/react";
import { useTheme } from "../ThemeDark";

export function DrawerComponent({
    isOpen,
    onClose,
    placement,
    onEsc,
    children
}: DrawerProps) {

    const { darkMode } = useTheme();

    return (
        <Drawer placement={placement} onEsc={onEsc} isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent p={4} bg={darkMode ? '#0f172a' : 'white'}>
            {children}
          </DrawerContent>
        </Drawer>
    )
}