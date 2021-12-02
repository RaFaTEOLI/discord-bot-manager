import { Suspense, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './hooks/darkMode';
import GlobalStyle from './styles/global';
import { lightTheme, darkTheme } from './styles/Themes';

import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import Home from './pages/Home';

const App = () => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  const handleToggle = useCallback(() => {
    themeToggler();
  }, [themeToggler]);
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ErrorBoundary>
        <Suspense fallback={Loading}>
          <Home theme={theme} handleToggle={handleToggle} />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
