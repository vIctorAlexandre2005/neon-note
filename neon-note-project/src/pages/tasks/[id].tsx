import { FcFolder } from 'react-icons/fc';
import { useContextGlobal } from '@/Context';
import { handleNavigation } from '@/utils/navigationProgress';
import { SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { BiArrowBack, BiFolder, BiPlus } from 'react-icons/bi';
import { GrProjects } from 'react-icons/gr';
import Image from 'next/image';

export const mockPastas = [
  {
    id: '1',
    nome: 'Trabalho',
  },
  {
    id: '2',
    nome: 'Estudos',
  },
  {
    id: '3',
    nome: 'Pessoal',
  },
];

export default function MainTaskFolderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useContextGlobal();

  const pasta = mockPastas.find(p => p.id === id);

  if (!pasta) return <p className='text-black-600'>Pasta não encontrada.</p>;

  return (
    <div className='p-4 w-full h-72'>
      <div
        className={`flex w-full items-center gap-2 mb-4 ${darkMode ? 'text-white' : 'text-black-800'}`}
      >
        <FcFolder size={32} />
        <h1 className={`text-2xl  font-bold`}>{pasta.nome}</h1>
      </div>
      <div
        className={`w-full h-full p-4 flex rounded shadow ${darkMode ? 'bg-neon-900 bg-opacity-30' : 'bg-gray-100'}`}
      >
        <div className='flex gap-2 flex-col w-full'>
          <div className={`${darkMode ? 'text-white' : 'text-black-700'} w-full mb-4 flex justify-between`}>
            <div className='flex items-center gap-2'>
              <GrProjects size={20} />
              <h1 className={`text-xl font-semibold text-left`}>
                Meus projetos
              </h1>
            </div>

            <div className=''>
              <Image
                src={'/tasks/organize_projects.svg'}
                alt='Imagem'
                width={150}
                height={150}
              />
            </div>
          </div>
          <SimpleGrid columns={3} justifyContent={'center'} gap={4}>
            <div
              key={pasta.id}
              className={`
                ${darkMode ? 'bg-neon-900' : 'bg-white'}
                w-72 h-44
               shadow-xl rounded-lg border-4  border-l-neon-400 border-b-neon-400 border-t-neon-500 border-r-neon-500
              cursor-pointer hover:bg-neon-500 transition duration-300 hover:text-white text-neon-400  
              `}
            >
              <div
                className={`${darkMode ? 'text-white' : ''}  hover:text-white flex justify-center mt-12 items-center flex-col`}
              >
                <BiPlus size={44} className='animate-bounce' />
                <h1 className='font-semibold text-xl'>Criar projeto</h1>
              </div>
            </div>
            {mockPastas.map(pasta => (
              <div
                key={pasta.id}
                className={`${darkMode ? 'bg-neon-900 hover:bg-opacity-15' : 'bg-white'} shadow-md w-72 h-44 rounded-lg p-2 hover:bg-neon-400 hover:text-white text-black-600 border-4 border-l-neon-400 border-r-0 border-b-0 border-t-0 cursor-pointer duration-300`}
              >
                <p className={`text-lg ${darkMode ? 'text-white' : ''}`}>
                  {pasta.nome}
                </p>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}
