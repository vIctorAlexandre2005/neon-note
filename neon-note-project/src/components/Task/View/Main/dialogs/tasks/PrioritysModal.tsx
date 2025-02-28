import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { useContextGlobal } from '@/Context';
import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface SelectPriorityProps {
  value?: string;
  priority: string;
}
export function SelectPriorityModal({ value, priority }: SelectPriorityProps) {
  const { darkMode } = useContextGlobal();
  const levelsPrioritys = [
    { value: 'URGENTE', title: 'URGENTE', bg: 'red' },
    { value: 'IMPORTANTE', title: 'IMPORTANTE', bg: 'orange' },
    { value: 'MÉDIO', title: 'MÉDIO', bg: 'purple' },
    { value: 'BAIXO', title: 'BAIXO', bg: 'green' },
  ];
  const [updatePriority, setUpdatePriority] = useState(priority);

  console.log(updatePriority);

  return (
    <div className='flex justify-center items-center'>
      <RadioCardRoot value={updatePriority}>
        <SimpleGrid gap={4} columns={2}>
          {levelsPrioritys.map(level => (
            <RadioCardItem
              label={level.title}
              key={updatePriority === level.value ? updatePriority : level.value}
              value={
                updatePriority === level.value ? updatePriority : level.value
              }
              colorPalette={
                updatePriority === level.value ? level.bg : 'transparent'
              }
              _checked={{
                bg: 'transparent',
                colorPalette:
                  updatePriority === level.value ? level.bg : 'transparent',
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
