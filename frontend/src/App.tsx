import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './hooks/darkMode';
import GlobalStyle from './styles/global';
import { lightTheme, darkTheme } from './styles/Themes';

import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import Home from './pages/Home';

function App() {
  const [theme] = useDarkMode();
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;
  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <ErrorBoundary>
          <Suspense fallback={Loading}>
            <Home />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;
