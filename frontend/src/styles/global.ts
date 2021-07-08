import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line
interface GlobalProps {
  theme: {
    body: string;
    text: string;
    border: string;
    background: string;
  };
}

export default createGlobalStyle<GlobalProps>`
  body {
    margin: 0;
    font-family: 'Roboto Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    color: ${props => props.theme.text};
    background: ${props => props.theme.background};
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
  }
  hr {
    border-width: 0.5px;
    border-color: #61dafb;
  }
`;
