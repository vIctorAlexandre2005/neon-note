import Layout from '@/components/Layout/AppLayout';
import { ConnectionStatus } from '@/components/common/onlineStatus/Connection';
import ParamsContext from '@/Context';
import NoteContext from '@/components/Notes/Context/NoteContext';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskContext from '@/components/Task/Context/TaskContext/TaskContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ParamsContext>
      <NoteContext>
        <TaskContext>
          <ChakraProvider>
            <Layout>
              <ConnectionStatus />
              <Component {...pageProps} />
            </Layout>
            <ToastContainer pauseOnHover={false} position='bottom-right' />
          </ChakraProvider>
        </TaskContext>
      </NoteContext>
    </ParamsContext>
  );
}
