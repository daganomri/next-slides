import { createGlobalStyle } from "styled-components";

import { camelVariablesToStyledKebab } from "@/lib/Utils";
import siteConfig from "@/site.config";

const { cssVariables } = siteConfig;

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #050505;
    --meta: #888;
    --accent: rgb(0, 92, 221);
    --text: #FAFAFA;
    --base: 1.5rem;
    --code: 1rem;
    --heading-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
    --heading-font-weight: 800;
    ${camelVariablesToStyledKebab(cssVariables)}
  }

  @media (max-width: 600px) {
    :root {
      --base: 1.2rem;
    }
  }

  * {
    box-sizing: border-box;
    min-width: 0px;
  }

  body,
  html {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: var(--base);
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'calt', 'liga', 'hist', 'onum', 'pnum';

    overflow: hidden;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    color: var(--text);
    background-color: var(--bg);
  }

  #slide {
    overflow: hidden;
    position: absolute;

    width: 100vw;
    height: 100vh;
    padding: 1rem;

    background-size: cover;

    text-align: center;

    -webkit-overflow-scrolling: touch;
  }

  #slide ul,
  #slide ol {
      text-align: left;
      margin-left: 32px;
  }

  #slide ol {
    list-style: none;
    counter-reset: slide-ol-counter;
  }

  #slide ol li {
    counter-increment: slide-ol-counter;
    margin-bottom:0.5em;
  }

  #slide ol li::before {
    content: "0" counter(slide-ol-counter) ".";
    font-weight: bold;
    font-size: 2rem;
    margin-right: 0.5rem;
    letter-spacing:1px;
    font-family: var(--heading-font-family);
    line-height: 1;
    position:relative;
    top:0.1em;
}

  img {
    width: min(calc(100vmin + 5vmax), 100%);
    object-fit: cover;
  }

  a {
    color: var(--text);

    text-decoration-skip-ink: auto;
  }

  blockquote {
    font-size: 120%;
    font-weight: bold;

    width: 50vw;

    text-align: left;
  }

  @media (max-width: 900px) {
    blockquote {
      width: 90vw;
    }
  }

  blockquote div::before {
    content: '\\201C';
  }

  blockquote div::after {
    content: '\\201D';
  }

  cite {
    font-size: 80%;
    font-weight: normal;
    font-style: normal;

    display: block;

    margin-top: 2rem;
  }

  cite::before {
    content: '\\2014\\00a0';
  }

  pre {
    max-width: calc(100vw - 2rem);
    font-size: 0.75rem !important; 

    overflow-x: hidden;
    margin-top: 0;

    text-align: left;

    color: var(--accent);
  }

  code {
    font-family: menlo, monospace;
    overflow-x: auto;
  }


  code > span:not([class]):last-of-type
   {
    display: none !important;
  }

  a:hover {
    color: var(--accent);
  }

  h1 {
    font-family: var(--heading-font-family);
    font-weight: var(--heading-font-weight);
    font-size: 200%;

    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: var(--heading-font-family);
    font-weight: var(--heading-font-weight);
    font-size: 120%;

    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  header {
    font-size: 50%;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 20px;

    user-select: none;
  }

  header a,
  time {
    text-decoration: none;

    color: var(--meta);
  }

  header a:hover {
    color: var(--meta);
  }

  header span {
    color: var(--text);
  }
`;
export default GlobalStyle;
