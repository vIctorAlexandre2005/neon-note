import Layout from "@/components/Layout/AppLayout";
import { ThemeProvider } from "@/components/ThemeDark";
import ParamsContext from "@/Context";
import NoteContext from "@/Context/NoteContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (

    <ParamsContext>
      <ChakraProvider>
        <ThemeProvider>
          <NoteContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </NoteContext>
          <ToastContainer pauseOnHover={false} position="bottom-right" />
        </ThemeProvider>
      </ChakraProvider>
    </ParamsContext>
  );
}
