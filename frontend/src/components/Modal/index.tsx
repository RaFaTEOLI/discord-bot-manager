import React from 'react';

import { ModalContainer, ModalMain, ModalTitle, CloseButton } from './styles';

interface ModalProps {
  handleClose(): void;
  show: boolean;
  title: string;
  children: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  handleClose,
  show,
  title,
  children,
}) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {show && (
      <ModalContainer>
        <ModalMain>
          <ModalTitle>
            <h1>{title}</h1>
            <CloseButton onClick={handleClose}>×</CloseButton>
          </ModalTitle>
          {children}
        </ModalMain>
      </ModalContainer>
    )}
  </>
);

export default Modal;
