import styled from 'styled-components/macro';

export const Wrap = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    min-width: 320px;
    align-items: center;
    justify-content: center;
`;

export const FormWrap = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const SelectLanguageButton = styled.button`
    display: inline-block;
    font-size: 20px;
    border: 0;
    outline: 0;
    background: none;
    text-align: left;
    color: #8a8c7e;
    vertical-align: middle;
`;

export const Form = styled.form`
    display: block;
    position: relative;
    width: 80%;
    margin: -100px auto 0;
`;

export const SubmitButton = styled.button`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    background: none;
    z-index: 1;
    opacity: 0;
`;

export const Result = styled.div`
    padding: 30vw 20px;
    word-break:break-all;
    text-align: center;
    font-size: ${props => (props.fontIndex ? `${60 + props.fontIndex}px` : '40px')};
`;

export const PreviewUtils = styled.div`
    position: absolute;
    top: 30px;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translateX(-50%);
`;

export const RoundButton = styled.button`
    display: inline-block;
    margin-right: 10px;
    border: 0;
    background: none;
    cursor: pointer;
    border: 2px solid #000;
    border-radius: 25px;
    vertical-align: middle;
`;

export const EditButton = styled(RoundButton)`
    width: 50px;
    height: 50px;
`;

export const SizeButtons = styled(RoundButton).attrs({
    as: 'div'
})`
    padding: 0 20px;
    height: 50px;
    cursor: default;
`;

export const SizeButton = styled(RoundButton)`
    width: 40px;
    height: 50px;
    border: 0;
    margin: 0;
`;

export const SizeButtonLabel = styled.div`
    display: inline-block;
    padding-right: 10px;
    font-weight: 700;
`;

export const FontSelector = styled(RoundButton).attrs({
    as: 'div'
})`
    display: inline-flex;
    padding: 0 20px;
    height: 50px;
    cursor: default;
    align-items: center;

    @media (max-width: 768px) {
        margin-top: 10px;
    }

    div[id^="font-picker"] ul {
        top: 40px;
        box-shadow: none;
        border: 2px solid transparent;
        background-color: transparent;
    }

    div[id^="font-picker"].expanded ul {
        border-color: #000;
        background-color: #fff;
    }

    div[id^="font-picker"] {
        box-shadow: none;
    }

    div[id^="font-picker"] .dropdown-button {
         background: none;
    }

    div[id^="font-picker"] .dropdown-button:hover, 
    div[id^="font-picker"] .dropdown-button:focus {
        background: none;
    }

    span {
        font-weight: 700;
    }
`;

export const PreviewButton = styled(RoundButton)`
    width: 30px;
    height: 30px;
    margin: 0 10px;
`;

export const SaveButton = styled(RoundButton)`
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 50px;
    height: 50px;
`;
