import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// components
import { Times } from 'styled-icons/fa-solid';
// styles
import { ModalWrap, Modal, ModalContainer, ModalContent, CloseButton } from './styles';

const ModalComponent = ({ isVisible, children, buttonText, onClose }) => {
    const [isModalVisible, setIsVisible] = useState(isVisible);
    
    const handleClick = () => {
        setIsVisible(false);
        onClose();
    };

    useEffect(() => {
        setIsVisible(isVisible);
    }, [isVisible]);

    return isModalVisible
        ? ReactDOM.createPortal(
            <React.Fragment>
                <ModalWrap>
                    <Modal>
                        <ModalContainer>
                            <ModalContent>{children}</ModalContent>
                            <CloseButton type="button" onClick={handleClick}>
                                <Times size="40" />
                            </CloseButton>
                        </ModalContainer>
                    </Modal>
                </ModalWrap>
            </React.Fragment>,
              document.body,
          )
        : null;
};

ModalComponent.propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    buttonText: PropTypes.string,
};

ModalComponent.defaultProps = {
    isVisible: false,
    close: () => {},
    children: React.createElement('div'),
    buttonText: '',
};

export default ModalComponent;
