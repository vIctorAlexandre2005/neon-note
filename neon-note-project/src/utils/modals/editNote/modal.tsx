import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { PropsEditModal, PropsModalEdit } from ".";

export function EditNote({
  open,
  onClose,
  title,
  setTitle,
  text,
  setText,
  handleSave
}: PropsModalEdit) {
  return (
    <>
      <Modal size={"xl"} isOpen={open} isCentered onClose={onClose}>
        <ModalOverlay h={"100vh"} w={"100%"} onClick={handleSave} />
        <ModalContent
          bg={"#004aff"}
          w={"100%"}
          h={"75%"}
        >
          <ModalHeader p={"0.5"} borderBottom={"1px solid"} borderBottomColor={"#afd7ff"} mt={"2"}>
            <Input
              fontSize={"1.75rem"}
              textAlign={"left"}
              border={"none"}
              _focus={{
                outline: 0,
                border: 'none'
              }}
              _focusVisible={"none"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full font-regular text-9xl text-white bg-neon-600 focus:outline-none focus:border-blue-500"
            />
          </ModalHeader>
          <ModalBody p={"1"}>
            <Textarea
              w={"100%"}
              h={"100%"}
              border={"none"}
              resize={"none"}
              _focus={{
                outline: 0,
              }}
              _focusVisible={"none"}
              color={"white"}
              fontSize={"1.2rem"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter display={"flex"} p={"0.5rem"} justifyContent={"center"} gap={2} borderTop={"1px solid"} borderTopColor={"#78c0ff"}>
          <Button w={"100%"} onClick={onClose} colorScheme="red">
              Cancelar
            </Button>

            <Button w={"100%"} onClick={handleSave} colorScheme="blue">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}