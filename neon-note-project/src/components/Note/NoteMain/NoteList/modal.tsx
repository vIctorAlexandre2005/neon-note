import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from "@chakra-ui/react";

export function ModalIdx({ onClose, open, item, item2, onSave } : any) {
    const [title, setTitle] = useState(item);
    const [text, setText] = useState(item2);

    useEffect(() => {
        setTitle(item);
        setText(item2);
    }, [item, item2]);

    const handleSave = () => {
        onSave(title, text);
    };

    return (
        <>
            <Modal isOpen={open} isCentered onClose={onClose}>
                <ModalOverlay h={"100vh"} w={"100%"} onClick={onClose} />
                <ModalContent bg={"#004aff"} w={"100%"} h={"75%"} maxH={"100%"} overflow={"auto"}>
                    <ModalHeader w={"100%"}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full font-regular text-3xl text-white bg-transparent focus:outline-none focus:border-blue-500"
                        />
                    </ModalHeader>
                    <ModalBody w={"100%"}>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-full resize-none text-white font-regular text-xl bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSave} colorScheme="blue">Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
