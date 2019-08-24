import { useReducer, useMemo, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import validate from './validate';
// constants
const UPDATE = 'UPDATE';
const VALIDATE = 'VALIDATE';
const BLUR = 'BLUR';
const SUBMIT = 'SUBMIT';

function reducer(state, { type, payload }) {
    switch (type) {
        case UPDATE:
            const values = { ...state.values, ...payload };

            return {
                ...state,
                values,
                errors: {},
            };
        case VALIDATE:
            return { ...state, errors: payload };
        case BLUR:
            const blurred = { ...state.blurred, [payload]: true };
            return { ...state, blurred };
        case SUBMIT:
            return { ...state, isSubmitted: true };
        default:
            return state;
    }
}

const useForm = (config = {}, submitCallback) => {
    const [state, dispatch] = useReducer(reducer, getInitialState(config));
    if (typeof config === 'function') config = config(state.values);
    if (!config.fields) throw Error('invalid config');

    const errors = useMemo(() => getErrors(state, config), [state, config]);
    const handleSubmit = useCallback(onSubmit, [state.values, errors]);
    const isFormValid = useMemo(
        () => Object.values(errors).every(error => error === null),
        [errors],
    );

    useDeepCompareEffect(() => {
        const errors = validate(state.values, config.fields);

        dispatch({ type: VALIDATE, payload: errors });
    }, [state.values, config.fields]);

    function getErrors(state, config) {
        if (config.showErrors === 'always') {
            return state.errors;
        }

        if (config.showErrors === 'blur') {
            return Object.entries(state.blurred)
                .filter(([, blurred]) => blurred)
                .reduce(
                    (acc, [name]) => ({ ...acc, [name]: state.errors[name] }),
                    {},
                );
        }
        return state.isSubmitted ? state.errors : {};
    }

    function getInitialState(config) {
        if (typeof config === 'function') {
            config = config({});
        }

        if (!config.fields) throw Error('invalid config');

        const initial = Object.keys(config.fields).reduce(
            ([initialValues, initialBlurred], fieldName) => {
                initialValues[fieldName] =
                    config.fields[fieldName].initialValue || '';
                initialBlurred[fieldName] = false;
                return [initialValues, initialBlurred];
            },
            [{}, {}],
        );

        const initialErrors = validate(initial[0], config.fields);
        return {
            values: initial[0],
            errors: initialErrors,
            blurred: initial[1],
            isSubmitted: false,
        };
    }

    function onSubmit(event) {
        if (event) event.preventDefault();
        submitCallback && submitCallback({ values: state.values, isFormValid });
        dispatch({ type: SUBMIT });
    }

    function resolveInputTypeValue(e) {
        if (!e.target) return e; // custom input: Dropdown
        if (e.target.type === 'checkbox') return e.target.checked;
        return e.target.value;
    }

    function getFieldProps(fieldName, overrides = {}) {
        return {
            onChange: e => {
                if (!config.fields[fieldName]) return;
                const value = resolveInputTypeValue(e);
  
                dispatch({
                    type: UPDATE,
                    payload: {
                        [fieldName]: value,
                    },
                });

                if (overrides.onChange) overrides.onChange(e);
            },
            onBlur: () => {
                dispatch({ type: BLUR, payload: fieldName });
            },
            name: fieldName,
            value: state.values[fieldName] || '',
            error: errors[fieldName],
            'aria-invalid': String(!!errors[fieldName]),
        };
    }

    return {
        isSubmitted: state.isSubmitted,
        isFormValid,
        handleSubmit,
        getFieldProps,
        errors,
    };
};

export default useForm;
