import React from 'react';

import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import { Icon, SwitchContainer } from './styles';

interface SwitchProps {
  handleToggle: () => void;
  theme: string;
}

const Switch = ({ theme, handleToggle, ...otherProps }: SwitchProps) => (
  <SwitchContainer>
    {' '}
    <a href="#theme" onClick={handleToggle} {...otherProps}>
      <Icon icon={theme === 'dark' ? faMoon : faSun} />
    </a>
  </SwitchContainer>
);

export default Switch;
