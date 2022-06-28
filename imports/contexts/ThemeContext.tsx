import React, { ReactNode } from 'react';

type ContextType = {
  toggleDark: () => void;
  isDark: boolean;
};

const defaultContext: ContextType = {
  toggleDark: () => {
    console.warn('Should have been overridden');
  },
  isDark: true,
};

export const ThemeContext = React.createContext(defaultContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('ThemeContext:isDark'));
    if (isDark !== undefined && isDark !== null) {
      setIsDark(isDark);
    }
  }, []);

  const context: ContextType = {
    toggleDark: () => {
      localStorage.setItem('ThemeContext:isDark', String(!isDark));
      setIsDark(!isDark);
    },
    isDark,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
