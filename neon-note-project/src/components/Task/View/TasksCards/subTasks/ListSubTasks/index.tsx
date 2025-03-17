import { SubTasks } from '@/utils/mockFolders';
import { ButtonComponent } from '@/components/common/Button';
import FadeIn from '@/components/common/Effects/FadeIn';
import { useContextGlobal } from '@/Context';
import { Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

interface ListSubTasksProps {
  listSubTasks: SubTasks[]; // id e titulo herdando
  titleStatusSubTasks: string;
  iconStatus: JSX.Element;
  check?: boolean;
}

export function ListSubTasks({titleStatusSubTasks, listSubTasks, iconStatus, check}: ListSubTasksProps) {
  const { darkMode } = useContextGlobal();
  const [open, setOpen] = useState(false);
  function handleOpenListDoneSubTask() {
    setOpen(!open);
  }
  
  return (
    <div
      className={`
          flex-col gap-2  rounded-md p-2 items-center transition duration-300
          ${darkMode ? 'bg-slate-800 hover:bg-slate-800 hover:bg-opacity-60' : 'bg-gray-200 bg-opacity-50 hover:bg-gray-200'}
        `}
    >
      <div
        onClick={handleOpenListDoneSubTask}
        className='flex justify-between cursor-pointer items-center'
      >
        <h1
          className={`
              flex font-semibold items-center gap-2 text-lg 
              ${darkMode ? 'text-gray-100' : 'text-black-800'}
            `}
        >
          {titleStatusSubTasks} {`(${listSubTasks?.length})`}
          {iconStatus}
        </h1>
        {!open && (
          <IoIosArrowBack size={24} color={darkMode ? 'white' : '#333333 '} />
        )}
        {open && (
          <IoIosArrowDown size={24} color={darkMode ? 'white' : '#333333 '} />
        )}
      </div>

      <div className='flex justify-between items-center'>
        {open && (
          <div className='flex w-full flex-col p-2 mb-2 gap-2'>
            {listSubTasks.map(item => (
              <FadeIn>
                <div className='flex items-center justify-between'>
                  <div>
                    <Checkbox.Root checked={check} variant={'solid'}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control
                        border={'1px solid'}
                        borderColor={'blue.500'}
                        _checked={{ bg: 'blue.500' }}
                      >
                        <Checkbox.Indicator
                          values={item.title}
                          color={'white'}
                        />
                      </Checkbox.Control>
                      <Checkbox.Label
                        fontSize={'medium'}
                        color={darkMode ? 'white' : 'blackAlpha.800'}
                        fontWeight={'medium'}
                      >
                        {item.title}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  </div>

                  <div className='flex items-center gap-2'>
                    <ButtonComponent
                      icon={<MdEdit size={18} />}
                      className={`hover:bg-neon-500 hover:text-white ${darkMode ? 'text-white' : 'text-black-800'}`}
                    />
                    <ButtonComponent
                      icon={<FaTrashCan size={18} />}
                      className={`hover:bg-red-500 hover:text-white ${darkMode ? 'text-white' : 'text-black-800'}`}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
