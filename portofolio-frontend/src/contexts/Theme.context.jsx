// src/contexts/Theme.context.jsx
import { createContext, useState, useCallback, useMemo } from 'react';
import { themes } from './Theme';

// 👇 1
const switchTheme = (theme) =>
  theme === themes.dark ? themes.light : themes.dark;

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    sessionStorage.getItem('themeMode') || themes.dark,
  );

  const toggleTheme = useCallback(() => {
    const newThemeValue = switchTheme(theme); // 👈 2
    setTheme(newThemeValue);
    sessionStorage.setItem('themeMode', newThemeValue);
  }, [theme]);

  // 👇 3
  const value = useMemo(
    () => ({ theme, textTheme: switchTheme(theme), toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
