import { SimpleGrid } from '@chakra-ui/react';
import { useContextGlobal } from '@/Context';
import { HTMLInputTypeAttribute, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import FadeIn from '@/components/common/Effects/FadeIn';
import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';

interface InputsCreateTaskCard {
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputsCreateTaskCard({
  value,
  onChange,
  label,
  placeholder,
  type,
}: InputsCreateTaskCard) {
  const { darkMode } = useContextGlobal();
  return (
    <div className={label ? 'flex items-center gap-2' : ''}>
      <h1
        className={`${darkMode ? 'text-gray-100' : 'text-black-800'} font-semibold text-lg`}
      >
        {label}
      </h1>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`
        ${darkMode ? 'text-gray-100' : 'text-black-900'}
        ${darkMode ? 'border-slate-700' : 'border-gray-300'}
        text-lg bg-transparent p-1 w-full placeholder:text-lg border-2 rounded-lg outline-none
        hover:border-neon-400 hover:border-opacity-50 transition duration-300
        focus:border-neon-500 focus:border-opacity-50
        `}
      />
    </div>
  );
}

interface TextAreaCreateTaskCard {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaCreateTaskCard({
  placeholder,
  value,
  onChange,
}: TextAreaCreateTaskCard) {
  const { darkMode } = useContextGlobal();
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        ${darkMode ? 'text-gray-100' : 'text-black-900'}
        ${darkMode ? 'border-slate-700' : 'border-gray-300'}
        text-lg bg-transparent p-1 w-full placeholder:text-lg border-2 rounded-lg outline-none resize-none h-32
        hover:border-neon-400 hover:border-opacity-50 transition duration-300
        focus:border-neon-500 focus:border-opacity-50
        `}
    />
  );
}

interface SelectPriorityProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function SelectPriority({ value, onChange }: SelectPriorityProps) {
  const [openListLevelPrioritys, setOpenListLevelPrioritys] = useState(false);
  function handleOpenLevelPrioritys() {
    setOpenListLevelPrioritys(!openListLevelPrioritys);
  }
  const { darkMode } = useContextGlobal();
  const levelsPrioritys = [
    { value: 'URGENTE', title: 'URGENTE', bg: 'red' },
    { value: 'IMPORTANTE', title: 'IMPORTANTE', bg: 'orange' },
    { value: 'MÉDIO', title: 'MÉDIO', bg: 'purple' },
    { value: 'BAIXO', title: 'BAIXO', bg: 'green' },
  ];
  return (
    <div className='flex flex-col gap-4'>
      <div
        onClick={handleOpenLevelPrioritys}
        className={`${darkMode ? 'hover:text-gray-400 text-gray-100' : 'hover:text-black-600 text-black-800'} duration-300 transition cursor-pointer gap-2 flex items-center font-semibold text-lg`}
      >
        <h1>Selecione o nível de prioridade</h1>
        <IoIosArrowDown size={20} />
      </div>
      <div className='flex justify-center items-center w-full'>
        <FadeIn>
          <RadioCardRoot defaultValue={'Urgente'}>
            <SimpleGrid columns={2}>
              {levelsPrioritys.map(level => (
                <RadioCardItem
                  label={level.title}
                  key={level.value}
                  value={level.value}
                  onChange={onChange}
                  colorPalette={level.bg}
                  className={`${darkMode ? 'text-gray-100' : 'text-black-800'} text-base font-bold cursor-pointer`}
                />
              ))}
            </SimpleGrid>
          </RadioCardRoot>
        </FadeIn>
      </div>
    </div>
  );
}
