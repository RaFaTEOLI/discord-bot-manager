import React, { useCallback } from 'react';

import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import { useDarkMode } from '../../hooks/darkMode';

import { Icon, SwitchContainer } from './styles';

const Switch: React.FC = ({ ...otherProps }) => {
  const [theme, themeToggler] = useDarkMode();

  const handleToggle = useCallback(() => {
    themeToggler();
  }, [themeToggler]);
  return (
    <SwitchContainer>
      {' '}
      <a href='#theme' onClick={handleToggle} {...otherProps}>
        <Icon icon={theme === 'dark' ? faMoon : faSun} />
      </a>
    </SwitchContainer>
  );
};

export default Switch;
