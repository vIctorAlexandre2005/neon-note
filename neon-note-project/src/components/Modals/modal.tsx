import { Modal, ModalContent, ModalOverlay, ChakraProps } from "@chakra-ui/react";

interface ModalProps extends ChakraProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    size?: string;
    isCentered?: boolean;
}

export function ModalComponent({ children, onClose, isOpen, size, isCentered, ...rest }: ModalProps) {
    return (
        <Modal isOpen={isOpen} isCentered onClose={onClose} size={size}>
            <ModalOverlay />
            <ModalContent {...rest}>
                {children}
            </ModalContent>
        </Modal>
    )
}