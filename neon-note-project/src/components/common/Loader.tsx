import { useTheme } from '../ThemeDark';
import Image from 'next/image';

export function Loader() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`h-screen w-full ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div
        className={`flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed`}
      >
        <Image
          alt='Imagem'
          src={'/logoofc192.png'}
          className='animate-flute'
          height={100}
          width={100}
        />
      </div>
    </div>
  );
}
