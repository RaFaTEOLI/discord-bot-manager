import React from 'react';

import { SelectContainer } from './styles';

interface SelectProps {
  // eslint-disable-next-line
  handleSelectChange: any;
  placeholder: string;
  data: string[];
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  handleSelectChange,
  placeholder,
  data,
  value,
}) => {
  const isSelected = (row: string): boolean => value === row;
  return (
    <SelectContainer onChange={handleSelectChange}>
      <option value={value}>{placeholder}</option>
      {data.length > 0 &&
        data.map(row => (
          <option key={row} value={row} selected={isSelected(row)}>
            {row}
          </option>
        ))}
    </SelectContainer>
  );
};

export default Select;
