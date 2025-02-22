import { Box, Separator, SimpleGrid, Stack } from '@chakra-ui/react';
import {
  InputsCreateTaskCard,
  SelectPriority,
  TextAreaCreateTaskCard,
} from './inputs';
import { useContextGlobal } from '@/Context';
import { useCardTasks } from '@/components/Task/ViewModel/useTasks';

export function FormCreateTaskCard() {
  const { darkMode } = useContextGlobal();
  const {
    nameCreatedTask,
    setNameCreatedTask,
    descriptionCreatedTask,
    setDescriptionCreatedTask,
    limitDateToFinishTask,
    setLimitDateToFinishTask,
    levelPriorityTask,
    setLevelPriorityTask,
  } = useCardTasks();

  return (
    <div className='flex flex-col justify-center w-full'>
      <SimpleGrid columns={2} gap={4} w={'full'}>
        <InputsCreateTaskCard
          value={nameCreatedTask}
          onChange={(e) => setNameCreatedTask(e.target.value)}
          type='text'
          placeholder='Tarefa resumida'
        />
        <InputsCreateTaskCard
          value={limitDateToFinishTask?.toISOString()?.split('T')[0]}
          onChange={(e) => setLimitDateToFinishTask(new Date(e.target.value))}
          type='date'
          placeholder=''
          label='Prazo:'
        />
        <TextAreaCreateTaskCard
          value={descriptionCreatedTask}
          onChange={(e) => setDescriptionCreatedTask(e.target.value)}
          placeholder='Descreva com mais detalhes a sua tarefa...'
        />
        <SelectPriority
          value={levelPriorityTask}
          onChange={(e) => setLevelPriorityTask(e.target.value)}
        />
      </SimpleGrid>
    </div>
  );
}
