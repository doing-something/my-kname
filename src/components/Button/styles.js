import styled from 'styled-components/macro';

import {
    baseTextColor,
    smallFontSize,
    primaryButtonColor,
} from 'styles/variables';

export const ButtonStyle = styled.button`
    position: relative;
    padding: 1em;
    vertical-align: middle;
    line-height: 1.5;
    outline: 0;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition-property: background, border, box-shadow;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
    border: 1px solid transparent;
    font-weight: 700;

    display: ${props => (props.block ? 'flex' : 'inline-flex')};
    width: ${props => (props.block ? '100%' : 'auto')};
    font-size: ${props => (props.small ? `${smallFontSize}` : 'inherit')};

    background-color: ${props =>
        (props.base && 'linear-gradient(180deg, #6371c7, #5563c1)') ||
        (props.primary && primaryButtonColor) ||
        'transparent'};

    color: ${props =>
        ((props.base || props.primary) && '#fff') || `${baseTextColor}`};
`;
