import ParamsContext from "@/components/Context";
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
          <Component {...pageProps} />
          <ToastContainer pauseOnHover={false} position="top-right" /> {/* Posição configurada aqui */}
        </ThemeProvider>
      </ChakraProvider>
    </ParamsContext>
  );
}
