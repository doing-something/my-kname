import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
    @charset 'utf-8';

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html,
    body {
        position: relative;
        min-width: 320px;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        box-sizing: border-box;
    }

    body {
        word-wrap: break-word;
        word-break: keep-all;
    }

    a,body,button,dd,div,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,input,legend,li,ol,p,select,table,td,textarea,th,ul {
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-weight: 400;
    }

    body, button, input, select, table, textarea {
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
    }

    a img, fieldset, img {
        border: 0;
    }

    img {
        vertical-align: top;
    }

    ol,ul {
        list-style: none;
    }

    address, em {
        font-style: normal;
    }

    hr, legend {
        display: none;
    }

    textarea {
        resize: none;
    }

    .blind {
        overflow: hidden;
        position: absolute;
        clip: rect(0 0 0 0);
        margin: -1px;
        width: 1px;
        height: 1px;
    }

    button {
        outline: 0;
        cursor: pointer;
    }

    button::-moz-focus-inner {
        padding: 0;
        border: 0;
    }

    a {
        text-decoration: none;
    }

    .wrap {
        padding: 2em;
    }
`;

export default GlobalStyles;
