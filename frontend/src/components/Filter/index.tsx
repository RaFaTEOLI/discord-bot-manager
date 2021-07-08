import React from 'react';

import { FilterContainer } from './styles';

interface FilterProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ handleChange }) => {
  return (
    <FilterContainer>
      <input
        type='text'
        onChange={handleChange}
        placeholder={`${'Search'}...`}
      />
    </FilterContainer>
  );
};

export default Filter;
