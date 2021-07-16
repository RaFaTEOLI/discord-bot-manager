import React from 'react';

import { ButtonContainer } from './styles';

interface ButtonProps {
  onClick?: () => void;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <ButtonContainer onClick={onClick} {...otherProps}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
