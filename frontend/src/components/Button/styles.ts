import styled from 'styled-components';
import { shade } from 'polished';

export const ButtonContainer = styled.a`
  background: #fcbf49;
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: #000;
  width: 100%;
  height: 40px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 5px;
  border: 1px solid ${props => props.theme.border};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${shade(0.2, '#fcbf49')};
  }
`;
