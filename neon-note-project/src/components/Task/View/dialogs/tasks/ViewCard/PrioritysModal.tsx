import { useCardTasks } from '@/components/Task/hook/useTasks/useTasks';
import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { useContextGlobal } from '@/Context';
import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface SelectPriorityProps {
  value?: string;
  priority: string;
  setUpdatePriority: React.Dispatch<React.SetStateAction<string>>;
}
export function SelectPriorityModal({ value, priority, setUpdatePriority, }: SelectPriorityProps) {
  const { darkMode } = useContextGlobal();
  const levelsPrioritys = [
    { value: 'URGENTE', title: 'URGENTE', bg: 'red' },
    { value: 'IMPORTANTE', title: 'IMPORTANTE', bg: 'orange' },
    { value: 'MÉDIO', title: 'MÉDIO', bg: 'purple' },
    { value: 'BAIXO', title: 'BAIXO', bg: 'green' },
  ];

  return (
    <div className='flex justify-center items-center'>
      <RadioCardRoot value={priority}>
        <SimpleGrid gap={4} columns={2}>
          {levelsPrioritys.map(level => (
            <RadioCardItem
              label={level.title}
              key={priority === level.value ? priority : level.value}
              value={
                priority === level.value ? priority : level.value
              }
              colorPalette={
                priority === level.value ? level.bg : 'transparent'
              }
              _checked={{
                bg: 'transparent',
                colorPalette:
                priority === level.value ? level.bg : 'transparent',
              }}
              onChange={e =>
                setUpdatePriority((e.target as HTMLInputElement).value)
              }
              className={`${darkMode ? 'text-gray-100' : 'text-black-800'} text-base font-bold cursor-pointer`}
            />
          ))}
        </SimpleGrid>
      </RadioCardRoot>
    </div>
  );
}
