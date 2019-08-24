import styled from 'styled-components/macro';

import {
    errorTextColor,
    smallFontSize,
} from 'styles/variables';

export const DropdownWrap = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownDisplay = styled.div`
    display: flex;
    width: 100%;
    background: #fff;
    height: 40px;
    cursor: pointer;
    padding-right: 14px;
    padding-left: 0.8em;
    align-items: center;
`;

export const DropdownDisplaySpan = styled.span`
    width: 100%;
    position: relative;
`;

export const DropdownList = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;
    transition: transform ease 250ms;
    transform: ${props => (props.isVisible ? 'scale(1, 1)' : 'scale(0, 0)')};
`;

export const DropdownListWrap = styled.div`
    position: absolute;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
    cursor: pointer;
    background: #fff;
    border: 1px solid #9c9c9c;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    min-width: ${props => props.minWidth ? `${props.minWidth}px` : 'auto'};
`;

export const DropdownItem = styled.div`
    width: 100%;
    font-size: 12px;
    padding: 10px;
    border-top: none;
    white-space: nowrap;

    &:hover {
        font-weight: bold;
        background-color: #f4f3f0;
    }
`;

export const Error = styled.div`
    display: block;
    margin-top: 5px;
    font-size: ${smallFontSize};
    color: ${errorTextColor};
`;