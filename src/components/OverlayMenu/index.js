import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Times } from 'styled-icons/fa-solid';
// styles
import { OverlayWrap, ListWrap, List, Item, CloseButton, ItemButton } from './styles';

const OverlayMenu = memo(({
    isVisible,
    onClose,
    onSelect,
    options
}) => {
    const handleSelect = (i) => {
        return () => {
            onSelect(i);
            onClose();
        };
    };
   
    if (options.length < 1) return null;
    if (!options[0].label || !options[0].value) return null;

    return (
        <OverlayWrap isVisible={isVisible}>
            <CloseButton type="button" onClick={onClose}>
                <Times size="60" />
            </CloseButton>
            <ListWrap>
                <List>
                    {options.map((item, i) => (
                        <Item key={`option-${i}`}>
                            <ItemButton type="button" onClick={handleSelect(i)}>{item.label}</ItemButton>
                        </Item>
                    ))}
                </List>
            </ListWrap>
        </OverlayWrap>
    );
}, (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible);

OverlayMenu.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    options: PropTypes.array,
};

OverlayMenu.defaultProps = {
    isVisible: false,
    onClose: () => {},
    onSelect: () => {},
    options: []
};

export default OverlayMenu;
