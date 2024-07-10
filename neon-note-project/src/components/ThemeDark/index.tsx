import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  FunctionComponent,
} from "react";

// Defina a interface para o valor do contexto
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setLightMode: () => void;
}

// Definindo um valor padrão com a interface correta
const defaultValue: ThemeContextType = {
  darkMode: false,
  toggleDarkMode: () => { },
  setLightMode: () => { },
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

interface ChildrenProps {
  children: ReactNode;
}

export const ThemeProvider: FunctionComponent<ChildrenProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  function setLightMode() {
    setDarkMode(false);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
