import React from 'react';
import PropTypes from 'prop-types';
// components
import Spinner from 'components/Spinner';
// styles
import { ButtonStyle } from './styles';

function Button({
    type,
    content,
    onClick,
    disabled,
    block,
    primary,
    loading,
    small,
}) {
    return (
        <ButtonStyle
            type={type}
            onClick={onClick}
            disabled={disabled}
            block={block}
            primary={primary}
            isLoading={loading}
            small={small}
        >
            {!loading && content}
            {loading && <Spinner />}
        </ButtonStyle>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    block: PropTypes.bool,
    loading: PropTypes.bool,
    small: PropTypes.bool,
};

Button.defaultProps = {
    type: 'text',
    className: 'button',
    disabled: false,
    primary: false,
    block: false,
    loading: false,
    small: false,
    onClick: () => {},
};

export default Button;
