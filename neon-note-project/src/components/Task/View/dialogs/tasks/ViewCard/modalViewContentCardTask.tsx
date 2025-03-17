import { ButtonComponent } from "@/components/common/Button";
import { ConfirmationModal } from "@/components/common/modal";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { useContextGlobal } from "@/Context";
import { ProjectTasksPropsStatus } from "@/utils/mockFolders";
import { Editable, EditableInput, EditablePreview, EditableRoot } from "@chakra-ui/react";
import { MdDescription, MdOutlineLowPriority } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { SelectPriorityModal } from "./PrioritysModal";
import { Dispatch, SetStateAction } from "react";

interface ModalViewCardProps {
  taskId: string;
  title: string;
  description: string;
  priority: string;
  onCloseModalViewCardTask: () => void;
  status: string;
  updateTitle: string;
  setUpdateTitle: Dispatch<SetStateAction<string>>;
  updateDescription: string,
  setUpdateDescription: Dispatch<SetStateAction<string>>
  updatePriority: string,
  setUpdatePriority: Dispatch<SetStateAction<string>>
  deleteCardTask: (id: string) => void,
}

export function ModalViewContentCardTask({
  description,
  onCloseModalViewCardTask,
  status,
  taskId,
  updateTitle,
  setUpdateTitle,
  updateDescription,
  setUpdateDescription,
  updatePriority,
  setUpdatePriority,
  deleteCardTask,
}: ModalViewCardProps) {
  const { darkMode } = useContextGlobal();
  return (
      <>
      <DialogHeader
        display={'flex'}
        justifyContent={'space-between'}
        color={darkMode ? 'white' : 'blackAlpha.800'}
        gap={6}
        mt={'-5'}
      >
        <div className='w-full'>
          <EditableRoot
            fontSize={'2xl'}
            fontWeight={'bold'}
            textAlign={'start'}
            defaultValue={updateTitle}
            selectOnFocus={false}
          >
            <EditablePreview w={'full'} bg={'transparent'} />
            <EditableInput
              value={updateTitle}
              onChange={e => setUpdateTitle(e.target.value)}
              border={0}
              p={2}
            />
          </EditableRoot>
        </div>

        <DialogRoot size={'sm'} placement={'center'}>
          <DialogTrigger
            alignSelf={'flex-end'}
            w={'56'}
            display={'flex'}
            justifyContent={'end'}
          >
            <ButtonComponent
              className='flex w-full items-center gap-2 text-base font-semibold hover:bg-red-500 hover:bg-opacity-20 text-red-500 transition duration-300'
              text='Excluir tarefa'
              icon={<TbTrash size={20} />}
            />
          </DialogTrigger>

          <DialogContent shadow={'sm'}>
            <ConfirmationModal
              titleHeader='Deseja excluir essa tarefa permanentemente?'
              textToNegativeButton='Não'
              textToPositiveButton='Sim, desejo'
              negativeOnClick={onCloseModalViewCardTask}
              positiveOnClick={() => {
                deleteCardTask(taskId);
                onCloseModalViewCardTask();
              }}
            />
          </DialogContent>
        </DialogRoot>
      </DialogHeader>

      <DialogBody>
        <div className='flex w-full gap-6 justify-between'>
          <div className='descricao mb-4 w-full'>
            <h1
              className={`${darkMode ? 'text-white' : 'text-black-700'} mb-4 text-xl flex items-center gap-2 font-bold`}
            >
              <MdDescription size={20} />
              Descrição
            </h1>

            <div className='w-full'>
              <Editable.Root
                color={darkMode ? 'white' : 'gray.900'}
                defaultValue={description}
                placeholder={!description && ('Sem descrição' as any)}
              >
                <Editable.Preview
                  h={'48'}
                  alignItems='flex-start'
                  width='full'
                  bg={'transparent'}
                  color={darkMode ? 'white' : 'gray.800'}
                  p={2}
                  fontWeight={'semibold'}
                  fontSize={'md'}
                  border={'1px solid'}
                  borderColor={darkMode ? 'white' : 'gray.500'}
                  opacity={description ? 1 : 0.5}
                  borderRadius={'md'}
                />
                <Editable.Textarea
                  value={updateDescription}
                  onChange={e => setUpdateDescription(e.target.value)}
                  p={2}
                  fontSize={'md'}
                  resize={'none'}
                  h={'48'}
                  w={'full'}
                  placeholder={!description && ('Sem descrição' as any)}
                  outline={'none'}
                  border={'1px solid'}
                  borderColor={darkMode ? 'white' : 'gray.500'}
                  borderRadius={'xl'}
                  transition={'all 0.3s ease-in-out'}
                />
              </Editable.Root>
            </div>
          </div>

          <div className='prioritys flex flex-col w-full'>
            <h1
              className={`${darkMode ? 'text-white' : 'text-black-700'} mb-4 text-xl gap-2 flex items-center font-bold`}
            >
              <MdOutlineLowPriority size={24} />
              Prioridade
            </h1>
            <SelectPriorityModal
              priority={updatePriority}
              setUpdatePriority={setUpdatePriority}
            />
          </div>
        </div>
      </DialogBody>
      </>
  );
}
