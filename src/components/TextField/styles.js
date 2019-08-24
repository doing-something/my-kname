import styled from 'styled-components/macro';

import {
    errorTextColor,
    smallFontSize,
} from 'styles/variables';

export const TextFieldWrap = styled.div`
    width: 100%;
    margin-bottom: 15px;
    overflow: hidden;
`;

export const TextFieldContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

export const TextFieldLabel = styled.label`
    display: block;
    width: 100%;
    position: absolute;
    top: .65em;
    left: 0;
    padding: 0;
    text-align: left;
    color: #333;
    pointer-events: none;
    font-size: 1.2em;
    font-weight: 700;
    align-items: center;
    user-select: none;
    transform-origin: 0 0;
    transition: transform 0.2s 0.15s, color 1s;
    transition-timing-function: ease-out;
    transform: ${props => (props.value ? 'translate3d(0, -1.75em, 0) scale3d(0.75, 0.75, 1)' : 'none')};
`;

export const TextFieldLabelSpan = styled.span`
    display: block;
    width: 100%;
    position: relative;
    padding: 1.6em 0;
`;

export const SVG = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
    stroke: ${props => (props.value ? `#333` : '#92989e')};
    pointer-events: none;
    transition: transform 0.7s, stroke 0.7s;
    transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
    transform: ${props => (props.value ? 'translate3d(-66.6%, 0, 0)' : 'none')};
`;

export const TextFieldInput = styled.input`
    display: block;
    position: relative;
    width: 100%;
    height: 2em;
    font-size: 40px;
    font-weight: 700;
    padding: .5em 0 .15em;
    background-color: #fff;
    border: 0;
    outline: 0;
    transition: padding 150ms;
    appearance: none;

    &:focus + label {
        color: #333;
        transform: translate3d(0, -1.75em, 0) scale3d(0.75, 0.75, 1);
    }

    &:focus ~ svg {
        stroke: #333;
        transform: translate3d(-66.6%, 0, 0);
    }

    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus, 
    :-webkit-autofill:active,
    :-internal-autofill-selected  {
        background-color: #fff !important;
    }
`;

export const TextFieldError = styled.div`
    display: block;
    margin-top: 5px;
    font-size: ${smallFontSize};
    color: ${errorTextColor};
`;
