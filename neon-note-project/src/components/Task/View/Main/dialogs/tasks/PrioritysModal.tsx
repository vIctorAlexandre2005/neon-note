import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { useContextGlobal } from '@/Context';
import { SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface SelectPriorityProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priority: string;
}
export function SelectPriorityModal({ value, onChange, priority }: SelectPriorityProps) {
  const [openListLevelPrioritys, setOpenListLevelPrioritys] = useState(false);
  function handleOpenLevelPrioritys() {
    setOpenListLevelPrioritys(!openListLevelPrioritys);
  };

  const { darkMode } = useContextGlobal();
  
  const bgColor = priority === 'URGENTE' ? 'red' : priority === 'IMPORTANTE' ? 'orange' : priority === 'MÉDIO' ? 'purple' : 'green';
  const valuePriority = priority === 'URGENTE' ? 'URGENTE' : priority === 'IMPORTANTE' ? 'IMPORTANTE' : priority === 'MÉDIO' ? 'MÉDIO' : 'BAIXO';

  const levelsPrioritys = [
    { value: 'URGENTE', title: 'URGENTE', bg: 'red' },
    { value: 'IMPORTANTE', title: 'IMPORTANTE', bg: 'orange' },
    { value: 'MÉDIO', title: 'MÉDIO', bg: 'purple' },
    { value: 'BAIXO', title: 'BAIXO', bg: 'green' },
  ]
  
  return (
    <div className='flex justify-center items-center'>
      <RadioCardRoot defaultValue={value}>
        <SimpleGrid columns={2}>
          {levelsPrioritys.map(level => (
            <RadioCardItem
              label={level.title}
              key={valuePriority}
              value={valuePriority === level.value ? level.value : ''}
              onChange={onChange}
              colorPalette={bgColor}
              className={`${darkMode ? 'text-gray-100' : 'text-black-800'} text-base font-bold cursor-pointer`}
            />
          ))}
        </SimpleGrid>
      </RadioCardRoot>
    </div>
  );
}
