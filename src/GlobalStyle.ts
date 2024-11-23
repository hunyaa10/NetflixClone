import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    display: block;
    width: fit-content;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", 
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", 
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: black;
    color: #fff;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

export default GlobalStyle;
