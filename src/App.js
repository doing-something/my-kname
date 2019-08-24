import React, { useRef, useReducer, useCallback } from 'react';
import { Normalize } from 'styled-normalize';
import FontPicker from 'font-picker-react';
import html2canvas from 'html2canvas';
import GlobalStyles from 'styles/GlobalStyles';
import { 
    Wrap, 
    Form, 
    SubmitButton, 
    FormWrap, 
    SelectLanguageButton, 
    Result,
    PreviewUtils,
    EditButton,
    PreviewButton,
    SizeButtons,
    SizeButton,
    SizeButtonLabel,
    FontSelector,
    SaveButton,
    ResultModal,
    ResultGuide
} from 'styles';
// components
import TextField from 'components/TextField';
import OverlayMenu from 'components/OverlayMenu';
import If from 'components/If';
import Modal from 'components/Modal';
import { Pen, Plus, Minus } from 'styled-icons/fa-solid';
import { Eye, Save } from 'styled-icons/fa-regular';
// hooks
import useValidation, { isRequired, lengthBetween } from 'hooks/useValidation';
// constants
const SET_RESULT = 'SET_RESULT';
const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
const EDIT_MODE = 'EDIT_MODE';
const PREVIEW_MODE = 'PREVIEW_MODE';
const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE';
const UPDATE_FONT_FAMILY = 'UPDATE_FONT_FAMILY';
const TOGGLE_LANGUAGE_OPTIONS = 'TOGGLE_LANGUAGE_OPTIONS';
const TOGGLE_RESULT_MODAL = 'TOGGLE_RESULT_MODAL';
const FONT_INDEX = 10;
const fontFamilies = [
    'Noto Sans KR',
    'Nanum Myeongjo',
    'Gothic A1',
    'Sunflower',
    'Nanum Pen Script',
    'Nanum Gothic Coding',
    'Nanum Brush Script',
    'Black Han Sans',
    'Do Hyeon',
    'Single Day',
    'Noto Serif KR',
    'Jua',
    'Gugi',
    'Gaegu',
    'Dokdo',
    'Song Myung',
    'Poor Story',
    'Stylish',
    'Kirang Haerang',
    'East Sea Dokdo',
    'Black And White Picture',
    'Gamja Flower',
    'Cute Font',
    'Yeon Sung',
    'Hi Melody'
];

// TODO: google font picker의 폰트 동적 로딩

function reducer(state, { type, payload }) {
    switch (type) {
        case SET_RESULT:
            return { 
                ...state, 
                result: decodeURIComponent(payload), 
                isSubmitted: true,
                isPreview: true,
                isEditable: false
        };
        case SELECT_LANGUAGE:
            return { ...state, langIndex: payload };
        case EDIT_MODE:
            return { ...state, isPreview: false, isEditable: true };
        case PREVIEW_MODE:
            return { ...state, isPreview: true, isEditable: false };
        case UPDATE_FONT_SIZE:
            return { ...state, fontIndex: state.fontIndex + payload };
        case UPDATE_FONT_FAMILY:
            return { ...state, activeFontFamily: payload };
        case TOGGLE_LANGUAGE_OPTIONS:
            return { ...state, isLanguageOptionVisible: payload };
        case TOGGLE_RESULT_MODAL:
                return { 
                    ...state, 
                    isResultModalVisible: !state.isResultModalVisible,
                    imgUrl: state.isResultModalVisible ? null : payload
                };
        default:
            return state;
    }
}

const configs = {
    fields: {
        yourname: {
            rules: [
                [isRequired, 'Please fill out your name.'],
                [lengthBetween(2, 50), 'The text length must be between 2 and 35.'],
            ],
        }
    },
    showErrors: 'blur',
};

const langs = [
    {label: 'English', value: 'en'},
    {label: 'Japanese', value: 'jp'},
    {label: 'Chinese', value: 'cn'},
    {label: 'Vietnamese', value: 'vi'},
    {label: 'Indonesian', value: 'id'},
    {label: 'Arabic', value: 'ar'},
    {label: 'Bengali', value: 'bn'},
    {label: 'German', value: 'de'},
    {label: 'Spanish', value: 'es'},
    {label: 'French', value: 'fr'},
    {label: 'Hindi', value: 'hi'},
    {label: 'Italian', value: 'it'},
    {label: 'Malaysian', value: 'ms'},
    {label: 'Dutch', value: 'nl'},
    {label: 'Portuguese', value: 'pt'},
    {label: 'Russian', value: 'ru'},
    {label: 'Thai', value: 'th'},
    {label: 'Turkish', value: 'tr'},
];

function App() {
    const [state, dispatch] = useReducer(reducer, {
        result: '',
        langIndex: -1,
        isLanguageOptionVisible: false,
        isSubmitted: false,
        isPreview: false,
        fontIndex: 0,
        isResultModalVisible: false,
        activeFontFamily: 'Roboto',
        imgUrl: null
    });

    const { 
        result, 
        langIndex, 
        isLanguageOptionVisible, 
        isSubmitted, 
        isPreview,
        isEditable,
        fontIndex,
        activeFontFamily,
        isResultModalVisible,
        imgUrl
    } = state;
    const submitButtonRef = useRef();
    const resultRef = useRef();
  
    const submitForm = useCallback(({ values, isFormValid }) => {
        const srcLang = langs[langIndex].value;
        const query = values['yourname'];
        
        if (!isFormValid) return;
        
        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
        };
        submitButtonRef.current && submitButtonRef.current.focus();
        return fetch(`${process.env.REACT_APP_API_URL}/kname`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                query: encodeURIComponent(query),
                    srcLang
                }),
            }).then((res) => {
                return res.json();
            }).then(resJson => {
                dispatch({ type: SET_RESULT, payload: resJson.translated_text[0][0] });
            }).catch(err => alert(err.message));
    }, [langIndex]);

    const { getFieldProps, handleSubmit } = useValidation(
        configs,
        submitForm,
    );

    const toggleOverlay = () => {
        dispatch({ type: TOGGLE_LANGUAGE_OPTIONS, payload: !isLanguageOptionVisible });
    };

    const handleSelectLang = (index) => {
        dispatch({ type: SELECT_LANGUAGE, payload: index });
    };

    const handlePreviewMode = () => {
        dispatch({ type: PREVIEW_MODE });
    };

    const selectEditMode = () => {
        dispatch({ type: EDIT_MODE });
    };

    const increaseFont = () => {
        const size = fontIndex > 80 ? 0 : FONT_INDEX;
        dispatch({ type: UPDATE_FONT_SIZE, payload: size });
    };

    const decreaseFont = () => {
        const size = fontIndex < 20 ? 0 : -FONT_INDEX;
        dispatch({ type: UPDATE_FONT_SIZE, payload: size });
    };

    const updateFontFamily = (fontFamily) => {
        dispatch({ type: UPDATE_FONT_FAMILY, payload: fontFamily.family });
    };

    const handleSaveImage = () => {
        resultRef.current && html2canvas(resultRef.current)
            .then((canvas) => {
                saveImage(canvas.toDataURL());
            });
    };

    const closeModal = () => {
        dispatch({ type: TOGGLE_RESULT_MODAL, payload: null });
    };

    function saveImage(uri) {
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = `kname-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            dispatch({ type: TOGGLE_RESULT_MODAL, payload: uri });
        }
    }

    return (
        <>
            <Normalize />
            <GlobalStyles />
            <Wrap>
                <FormWrap>         
                    {!isPreview && (
                        <Form onSubmit={handleSubmit} noValidate>
                            <SelectLanguageButton type="button" onClick={toggleOverlay}>
                                {langIndex > -1 ? langs[langIndex].label : 'Select your language.'}
                            </SelectLanguageButton>
                            {result && (
                                <PreviewButton 
                                    type="button" 
                                    onClick={handlePreviewMode}
                                >
                                    <Eye size="20" />
                                </PreviewButton>
                            )}
                            {langIndex > -1 && (
                                <div style={{ marginTop: 30 }}>
                                    <TextField
                                        title="Your name"
                                        autoComplete="off"
                                        {...getFieldProps('yourname')}
                                    />
                                    <SubmitButton type="submit" ref={submitButtonRef}>subit</SubmitButton>
                                </div>
                            )}
                        </Form>
                    )}
                    {isPreview && (
                        <PreviewUtils>
                            <EditButton type="button" onClick={selectEditMode}>
                                <Pen size="20" />
                            </EditButton>
                            <SizeButtons>
                                <SizeButtonLabel>size</SizeButtonLabel>
                                <SizeButton type="button" onClick={increaseFont}>
                                    <Plus size="20" />
                                </SizeButton>
                                <SizeButton type="button" onClick={decreaseFont}>
                                    <Minus size="20" />
                                </SizeButton>
                            </SizeButtons>
                            
                            <FontSelector>
                                <FontPicker
                                    apiKey="AIzaSyBLabzHormO2-pOS4Fu2WTaJz_vt5GpmU8"
                                    activeFontFamily={activeFontFamily}
                                    onChange={updateFontFamily}
                                    families={fontFamilies}
                                />
                            </FontSelector>
                        </PreviewUtils>
                    )}
                    
                    <OverlayMenu
                        isVisible={isLanguageOptionVisible}
                        onClose={toggleOverlay}
                        options={langs}
                        onSelect={handleSelectLang}
                    />
             
                    <If condition={!!result}>
                        <SaveButton type="button" onClick={handleSaveImage}>
                            <Save size="20" />
                        </SaveButton>
                    </If>
                    {isSubmitted && !isEditable && !!result && (
                        <Result 
                            className="apply-font" 
                            ref={resultRef}
                            fontIndex={fontIndex}
                        >{result}</Result>
                    )}
                    <If condition={isSubmitted && !result}>
                        <Result>No Result.</Result>
                    </If>
                    <Modal isVisible={isResultModalVisible} onClose={closeModal}>
                        <ResultModal>
                            <ResultGuide>
                            To save, right click or touch and hold the image 
                            and choose 'Save Image'.
                            </ResultGuide>
                            <img src={imgUrl} alt={result} />
                        </ResultModal>
                    </Modal>
                </FormWrap>
            </Wrap>
        </>
    );
}

export default App;
