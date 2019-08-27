import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useDeepCompareEffect from 'use-deep-compare-effect';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// styles
import { 
    DropdownWrap, 
    DropdownDisplay, 
    DropdownDisplaySpan, 
    DropdownList, 
    DropdownListWrap, 
    DropdownItem, 
    Error
 } from './styles';


const DropDown = memo(({
    className, 
    name, 
    value,
    disabled,
    placeholder,
    onChange,
    error,
    required,
    options,
    minWidth,
}) => {
    const findIndexByValue = (arr, value) => arr.reduce((acc, el, i) => {
        if (el.value === value) acc = i; 
        return acc;
    }, -1);
    const dropdownRef = useRef();
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const containerRef = useRef();
    const itemRef = useRef();
    const handleOptionsOpen = () => setIsOptionVisible(false);
    useOnClickOutside(dropdownRef, handleOptionsOpen);

    const [selectedIndex, setSelectedIndex] = useState(findIndexByValue(options, value));

    useDeepCompareEffect(() => {
        setSelectedIndex(findIndexByValue(options, value));
    }, [options, value]);

    const itemHeight = itemRef.current ? itemRef.current.offsetHeight : 0;

    if (containerRef.current) 
        containerRef.current.scrollTop = selectedIndex * itemHeight;

    const handleShow = () => {
        setIsOptionVisible(!isOptionVisible);
    };

    const handleSelect = (value, index) => {
        return () => {
            setSelectedIndex(index);
            setIsOptionVisible(false);
            onChange(value);
        };
    };

    const renderOptions = () => {
        return options.map(({ label, value }, i) => (
            <DropdownItem 
                key={`option-${i}`}
                ref={itemRef}
                onClick={handleSelect(value, i)}
            >
                {label}
            </DropdownItem>
        ));
    };

    const getLabel = () => {
        if (selectedIndex < 0) return placeholder;

        return (options[selectedIndex] && options[selectedIndex].label) ||  placeholder;
    };

    return (
        <DropdownWrap ref={dropdownRef}>
            <DropdownDisplay onClick={handleShow}>
                <DropdownDisplaySpan>
                   {getLabel()}
                </DropdownDisplaySpan>
                {/* <i className="far fa-chevron-down" /> */}
            </DropdownDisplay>

            <DropdownList isVisible={isOptionVisible}>
                <DropdownListWrap ref={containerRef} minWidth={minWidth}>
                    {renderOptions()}
                </DropdownListWrap>
            </DropdownList>

            {error && (
                <Error>{error}</Error>
            )}
        </DropdownWrap>
    );
});

DropDown.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string, 
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    minWidth: PropTypes.number
};

DropDown.defaultProps = {
    name: '',
    className: '',
    value: '',
    disabled: false,
    required: false,
    error: null,
    placeholder: '',
    onChange: () => {},
    options: [],
};

export default DropDown;