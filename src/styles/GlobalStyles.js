import { createGlobalStyle } from 'styled-components/macro';

const fontPath = `${process.env.REACT_APP_URL}/fonts`;

const GlobalStyles = createGlobalStyle`
    @charset 'utf-8';
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 100;
        src: url(${fontPath}/NotoSansKR-Thin.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Thin.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Thin.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        src: url(${fontPath}/NotoSansKR-Light.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Light.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Light.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        src: url(${fontPath}/NotoSansKR-Regular.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Regular.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Regular.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        src: url(${fontPath}/NotoSansKR-Medium.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Medium.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Medium.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 700;
        src: url(${fontPath}/NotoSansKR-Bold.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Bold.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Bold.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 900;
        src: url(${fontPath}/NotoSansKR-Black.woff2) format('woff2'),
            url(${fontPath}/NotoSansKR-Black.woff) format('woff'),
            url(${fontPath}/NotoSansKR-Black.otf) format('opentype');
    }

    @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        src: local('Roboto Light'),
            local('Roboto-Light'),
            url(${fontPath}/Roboto-Light.ttf?v=1.101) format('truetype');
    }

    @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'),
            local('Roboto-Regular'),
            url(${fontPath}/Roboto-Regular.ttf?v=1.101) format('truetype');
    }

    @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        src: local('Roboto Medium'),
            local('Roboto-Medium'),
            url(${fontPath}/Roboto-Medium.ttf?v=1.101) format('truetype');
    }

    @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 700;
        src: local('Roboto Bold'),
            local('Roboto-Bold'),
            url(${fontPath}/Roboto-Bold.ttf?v=1.101) format('truetype');
    }

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
        font-family: Roboto, 'Noto Sans KR', sans-serif;
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
