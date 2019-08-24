import styled, { keyframes } from 'styled-components/macro';

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    border-left: 4px solid transparent;
    background: transparent;
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

export default Spinner;

export const PageSpinner = styled(Spinner)`
    width: 48px;
    height: 48px;
    border-width: 4px;
    border-left-width: 4px;
    border-color: #47c1bf;
    border-left-color: transparent;
`;
