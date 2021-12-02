import { useEffect, useState } from 'react';

export const useDarkMode = (): [string, () => void] => {
  const [theme, setTheme] = useState('dark');

  const setMode = (mode: string): void => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    theme === 'dark' ? setMode('light') : setMode('dark');
    window.location.reload();
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, themeToggler];
};
