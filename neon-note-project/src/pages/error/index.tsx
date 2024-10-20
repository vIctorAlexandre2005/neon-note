import { useTheme } from '@/components/ThemeDark';
import { errorToast } from '@/utils/toasts/toasts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ErrorConnection() {
  const { darkMode } = useTheme();

  const router = useRouter();

  useEffect(() => {
    errorToast('Verifique sua conexão!');
  }, [])

  return (
    <div className='top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed'>
      <div className='flex flex-col gap-4'>
        <Image
          alt='Imagem'
          src={'/error.svg'}
          className='animate-flute'
          height={400}
          width={400}
        />
        <h2
          className={`${darkMode ? 'text-slate-300' : 'text-black-500'} text-lg`}
        >
          Oops! Você realmente está conectado(a)? Tenta de novo para vermos!
        </h2>
      </div>
      <div className='flex justify-center mt-8'>
        <a 
          href='/' 
          className='bg-blue-600 text-white w-auto font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-md p-2'
        >
          Tente novamente
        </a>
      </div>
    </div>
  );
}
