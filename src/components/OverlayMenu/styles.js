import styled from 'styled-components/macro';

export const OverlayWrap = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(153, 204, 51, 0.9);
    z-index: 1;
    justify-content: center;
    align-items: center;
    visibility: ${props => props.isVisible ? `visible` : 'hidden'};
    opacity: ${props => props.isVisible ? 1 : 0};
    transform: ${props => props.isVisible ? `scale(1)` : 'scale(0.9)'};
    transition: ${props => props.isVisible ? `transform 0.4s, opacity 0.4s` : 'transform 0.2s, opacity 0.2s, visibility 0s 0.2s'};
`;

export const ListWrap = styled.div`
    position: relative;
    text-align: center;
`;

export const List = styled.ul`
    display: block;
    position: relative;
    height: 100%;
    margin: 0 10%;
    padding: 0;
    list-style: none;
`;

export const CloseButton = styled.button`
    position: absolute;
    width: 80px;
    height: 80px;
    top: 20px;
    right: 20px;
    overflow: hidden;
    border: 0;
    color: #fff;
    outline: 0;
    z-index: 100;
    background: none;
`;

export const Item = styled.li`
    display: inline-block;
    padding: .5em 1em;
    backface-visibility: hidden;
`;

export const ItemButton = styled.button`
    display: block;
    border: 0;
    outline: 0;
    background: none;
    cursor: pointer;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, .2);

    &:hover, &:focus, &:active {
        text-shadow: 1px 1px 1px rgba(0,0,0,.5);
    }
`;