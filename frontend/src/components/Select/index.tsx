import React from 'react';

import { SelectContainer } from './styles';

interface SelectProps {
  // eslint-disable-next-line
  handleSelectChange: any;
  placeholder: string;
  data: string[];
}

const Select: React.FC<SelectProps> = ({
  handleSelectChange,
  placeholder,
  data,
}) => {
  return (
    <SelectContainer onChange={handleSelectChange}>
      <option value=''>{placeholder}</option>
      {data.length > 0 &&
        data.map(row => (
          <option key={row} value={row}>
            {row}
          </option>
        ))}
    </SelectContainer>
  );
};

export default Select;
