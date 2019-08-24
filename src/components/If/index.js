import React, { memo } from 'react';
import PropTypes from 'prop-types';

const If = memo(({ condition, children }) => {
    return condition ? children : null;
}, (prevProps, nextProps) => prevProps.condition === nextProps.condition);

If.propTypes = {
    condition: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

If.defaultProps = {
    condition: false,
    children: React.createElement('div'),
};

export default If;
