import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from 'react';

// Defina a interface para o valor do contexto
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  setLightMode: () => void;
}

// Definindo um valor padrão com a interface correta
const defaultValue: ThemeContextType = {
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
  setLightMode: () => {},
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
    setDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  }

  function setLightMode() {
    setDarkMode(false);
  }

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode, toggleDarkMode, setLightMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
