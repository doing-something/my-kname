import React, { memo, useReducer, } from 'react';
import PropTypes from 'prop-types';
// styles
import {
    TextFieldWrap,
    TextFieldContainer,
    TextFieldLabel,
    TextFieldLabelSpan,
    TextFieldInput,
    SVG,
    TextFieldError,
} from './styles';
import compareProperties from 'utils/compareProperties';
// constants
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';

function reducer(state, { type, value }) {
    switch (type) {
        case UPDATE_INPUT_VALUE:
            return { ...state, inputValue: value, };
        default:
            return state;
    }
}

const TextField = memo(
    ({
        title,
        name,
        type,
        placeholder,
        disabled,
        autoComplete,
        onChange,
        onBlur,
        onFocus,
        required,
        error,
    }) => {
        const [state, dispatch] = useReducer(reducer, {
            inputValue: '',
        });

        const handleChange = e => {
            e.persist();
            const { value } = e.target;
            dispatch({ type: UPDATE_INPUT_VALUE, value });
            e.preventDefault();
            onChange(e);
        };

        const handleBlur = e => {
            onBlur(e);
        };

        return (
            <TextFieldWrap>
                <TextFieldContainer>
                    <TextFieldInput
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        value={state.inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={onFocus}
                    />
                    <TextFieldLabel value={state.inputValue}>
                        <TextFieldLabelSpan>{title || name}</TextFieldLabelSpan>
                    </TextFieldLabel>
                    <SVG width="300%" value={state.inputValue} height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </SVG>
                </TextFieldContainer>
                
                {error && <TextFieldError>{error}</TextFieldError>}
            </TextFieldWrap>
        );
    },
    (prevProps, nextProps) => compareProperties()([
        'error', 'disabled'
    ])
);

export default TextField;

TextField.prototype = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

TextField.defaultProps = {
    title: '',
    error: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    required: false,
    autoComplete: 'on',
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
};
