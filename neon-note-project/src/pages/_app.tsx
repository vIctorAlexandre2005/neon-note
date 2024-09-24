import ParamsContext from "@/components/Context";
import NoteContext from "@/components/Context/NoteContext";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeDark";
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
