import React, {useContext, useState} from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}
export function ThemeProvider({children}) {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme(theme => !theme);
  }
  return (
    <ThemeContext.Provider value={{darkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
