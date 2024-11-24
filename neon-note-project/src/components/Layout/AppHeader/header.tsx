import { Logout } from '@/components/Logout';
import { useTheme } from '@/components/ThemeDark';
import { useContextGlobal } from '@/Context';
import { handleSignin } from '@/utils/login';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { FiToggleLeft } from 'react-icons/fi';
import { IoToggleSharp } from 'react-icons/io5';

export function NoteHeader() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useContextGlobal();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const router = useRouter();

  return (
    <>
      <header
        className={`
        ${router.pathname === '/login' || router.pathname === '/error' ? 'hidden' : 'flex'}
        ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} 
        flex 
        justify-between
        items-center
        p-4
        border-b-2 
        `}
        onMouseLeave={onClose}
      >
        <div>
          <h1
            className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black-800'}`}
          >
            Bem vindo, {user?.displayName} 👋
          </h1>
        </div>
        <div onMouseEnter={onOpen}>
          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <div onMouseEnter={onOpen} onClick={onOpen}>
                {user && user?.photoURL && (
                  <div className='flex items-center gap-2'>
                    <img
                      src={user?.photoURL}
                      className='rounded-full border-2 border-neon-600 object-cover'
                      height={35}
                      width={35}
                    />
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent bg={'#f9f9f9f9'}>
              <PopoverArrow />
              {isOpen && (
                <>
                  <PopoverHeader>
                    <h3 className='text-lg'>Configurações</h3>
                  </PopoverHeader>

                  <PopoverBody>
                    <>
                      {user ? (
                        <button
                          onClick={Logout}
                          className='bg-red-500 flex items-center justify-center p-2 rounded-lg font-semibold text-white gap-2 hover:bg-red-400 w-2/5'
                        >
                          <BiLogOutCircle size={25} /> Sair
                        </button>
                      ) : (
                        <button
                          onClick={handleSignin}
                          className='bg-black-900 flex gap-2 p-2 rounded-xl font-semibold text-white hover:bg-black-800'
                        >
                          Sign In{' '}
                          <img src='/google.png' height={25} width={25} />
                        </button>
                      )}

                      <button
                        onClick={() => toggleDarkMode()}
                        className='bg-transparent text-black items-center mt-4 flex gap-2 p-2 rounded-lg font-semibold hover:text-neon-500'
                      >
                        {darkMode ? (
                          <BsMoonStarsFill size={25} />
                        ) : (
                          <BsSunFill size={25} />
                        )}{' '}
                        {darkMode ? (
                          <IoToggleSharp size={25} />
                        ) : (
                          <FiToggleLeft size={25} />
                        )}
                      </button>
                    </>
                  </PopoverBody>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </>
  );
}
