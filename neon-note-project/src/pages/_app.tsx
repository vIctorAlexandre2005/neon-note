import ParamsContext from "@/components/Context";
import { ThemeProvider } from "@/components/ThemeDark";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ParamsContext>
      <ChakraProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </ParamsContext>
  );
}
