import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableRoot,
} from '@chakra-ui/react';
import { MdDescription, MdOutlineLowPriority } from 'react-icons/md';
import { SelectPriorityModal } from './PrioritysModal';
import {
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { useContextGlobal } from '@/Context';
import { useState } from 'react';
import { useCardTasks } from '@/components/Task/ViewModel/useTasks';

interface ModalViewCardProps {
  taskId: string;
  title: string;
  description: string;
  priority: string;
}

export function ModalViewCardTask({
  title,
  description,
  priority,
  taskId,
}: ModalViewCardProps) {
  const { darkMode } = useContextGlobal();
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updatePriority, setUpdatePriority] = useState(priority);

  const { updateCardTask } = useCardTasks();

  return (
    <DialogContent
      shadow={'sm'}
      w={'full'}
      bg={darkMode ? '#0f172a' : 'gray.100'}
    >
      <DialogHeader color={darkMode ? 'white' : 'blackAlpha.800'}>
        <EditableRoot
          fontSize={'2xl'}
          fontWeight={'bold'}
          textAlign={'start'}
          defaultValue={title}
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
                color={darkMode ? 'white' : 'gray.500'}
                defaultValue={description}
                placeholder={!description && ('Sem descrição' as any)}
              >
                <Editable.Preview
                  h={'48'}
                  alignItems='flex-start'
                  width='full'
                  bg={'transparent'}
                  color={darkMode ? 'white' : 'gray.500'}
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
            <SelectPriorityModal priority={updatePriority} setUpdatePriority={setUpdatePriority} />
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <NegativeButtonComponent text='Cancelar' />
        <PositiveButtonComponent onClick={() => updateCardTask(taskId, updateTitle, updateDescription, updatePriority)} text='Atualizar' />
      </DialogFooter>
    </DialogContent>
  );
}
