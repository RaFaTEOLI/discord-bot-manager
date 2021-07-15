import React, { InputHTMLAttributes } from 'react';

import { InputContainer } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  handleChange,
  ...otherProps
}) => {
  return (
    <InputContainer>
      <input
        name={name}
        type='text'
        onChange={handleChange}
        placeholder={placeholder}
        {...otherProps}
      />
    </InputContainer>
  );
};

export default Input;
