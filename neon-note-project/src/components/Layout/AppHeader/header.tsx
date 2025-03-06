import { Logout } from '@/components/common/Logout';
import {
  PopoverContentComponent,
  PopoverRootComponent,
} from '@/components/common/Popover/PopoverModal';
import { useContextGlobal } from '@/Context';
import { handleSignin } from '@/utils/login';
import { PopoverBody, PopoverHeader, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { FiToggleLeft } from 'react-icons/fi';
import { IoToggleSharp } from 'react-icons/io5';

export function NoteHeader() {
  const { darkMode, toggleDarkMode } = useContextGlobal();
  const { user } = useContextGlobal();
  const { open: isOpen, onClose: onClose, onOpen: onOpen } = useDisclosure();

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
            className={`md:text-xl xs:text-sm font-bold ${darkMode ? 'text-white' : 'text-black-800'}`}
          >
            Bem vindo, {user?.displayName} 👋
          </h1>
        </div>
        <div onMouseEnter={onOpen}>
          <PopoverRootComponent isOpen={isOpen} onClose={onClose}>
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
            <PopoverContentComponent>
              {isOpen && (
                <>
                  <PopoverHeader>
                    <h3
                      className={`text-lg ${darkMode ? 'text-white' : 'text-black-800'}`}
                    >
                      Configurações
                    </h3>
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
                        className={`
                          bg-transparent items-center mt-4 flex gap-2 p-2 rounded-lg font-semibold hover:text-neon-500 
                          ${darkMode ? 'text-white' : 'text-black-800'}
                        `}
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
            </PopoverContentComponent>
          </PopoverRootComponent>
        </div>
      </header>
    </>
  );
}
