import React, { createContext, useContext, useState } from 'react';

const defaultValue = {}; // valor padrão para o contexto

const ThemeContext = createContext(defaultValue);

export function ThemeProvider({ children } : any) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  };

  function setLightMode () {
    setDarkMode(false);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
