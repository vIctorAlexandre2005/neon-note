import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableRoot,
  Flex,
  Tabs,
} from '@chakra-ui/react';
import { MdDescription, MdOutlineLowPriority } from 'react-icons/md';
import {
  ButtonComponent,
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { useContextGlobal } from '@/Context';
import { useState } from 'react';
import { useCardTasks } from '@/components/Task/hook/useTasks/useTasks';
import { TbTrash } from 'react-icons/tb';
import { ConfirmationModal } from '@/components/common/modal';
import { ProjectTasksPropsStatus } from '@/utils/mockFolders';
import { SelectPriorityModal } from './PrioritysModal';
import { ModalViewContentCardTask } from './modalViewContentCardTask';
import { SubTasksTab } from '../../../TasksCards/subTasks';

interface ModalViewCardProps {
  taskId: string;
  title: string;
  description: string;
  priority: string;
  onCloseModalViewCardTask: () => void;
  fromStatus: keyof ProjectTasksPropsStatus;
  toStatus: keyof ProjectTasksPropsStatus;
  status: string;
}

export function ModalViewCardGeneral({
  title,
  description,
  priority,
  taskId,
  onCloseModalViewCardTask,
  fromStatus,
  status,
  toStatus,
}: ModalViewCardProps) {
  const { darkMode } = useContextGlobal();
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updatePriority, setUpdatePriority] = useState(priority);

  const { updateCardTask, deleteCardTask } = useCardTasks();

  const items = [
    {
      title: 'Tarefa',
    },
    {
      title: 'Sub-Tarefas',
    },
  ];

  return (
    <DialogContent
      shadow={'sm'}
      w={'full'}
      bg={darkMode ? '#0f172a' : 'gray.100'}
      p={4}
    >
      <Flex minH='sm'>
        <Tabs.Root variant={'outline'} defaultValue='Tarefa' width='full'>
          <Tabs.List
            fontWeight={'bold'}
            fontSize={'lg'}
            color={darkMode ? 'whiteAlpha.900' : 'blackAlpha.700'}
            gap={4}
          >
            {items.map((item, index) => (
              <Tabs.Trigger
                p={2}
                _selected={{
                  bg: darkMode ? 'blue.900' : 'blue.100',
                  borderBottom: '3px solid',
                  borderBottomColor: darkMode ? 'blue.600' : 'blue.400',
                }}
                key={index}
                value={item.title}
              >
                {item.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box pos='relative' minH='200px' width='full'>
            {items.map((item, index) => (
              <Tabs.Content
                key={index}
                value={item.title}
                position='absolute'
                inset='0'
                _open={{
                  animationName: 'fade-in, scale-in',
                  animationDuration: '300ms',
                }}
                _closed={{
                  animationName: 'fade-out, scale-out',
                  animationDuration: '120ms',
                }}
              >
                {item.title === 'Tarefa' ? (
                  <ModalViewContentCardTask 
                    deleteCardTask={deleteCardTask}
                    description={description}
                    onCloseModalViewCardTask={onCloseModalViewCardTask}
                    priority={priority}
                    setUpdateDescription={setUpdateDescription}
                    setUpdatePriority={setUpdatePriority}
                    setUpdateTitle={setUpdateTitle}
                    status={status}
                    taskId={taskId}
                    title={title}
                    updateDescription={updateDescription}
                    updatePriority={updatePriority}
                    updateTitle={updateTitle}
                  />
                ) : (
                  <SubTasksTab />
                )}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Flex>
      <DialogFooter>
        <NegativeButtonComponent
          onClick={onCloseModalViewCardTask}
          text='Cancelar'
        />
        <PositiveButtonComponent
          onClick={() => {
            updateCardTask(
              status,
              taskId,
              updateTitle,
              updateDescription,
              updatePriority
            );
            onCloseModalViewCardTask();
          }}
          text='Atualizar'
        />
      </DialogFooter>
    </DialogContent>
  );
}
