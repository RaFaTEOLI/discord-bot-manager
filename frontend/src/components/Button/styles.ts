import styled from 'styled-components';
import { shade } from 'polished';

interface ButtonContainerProps {
  type?: string;
}

export const ButtonContainer = styled.a<ButtonContainerProps>`
  background: ${props =>
    props.type === 'danger' ? '#ff0000' : props.theme.buttonColor};
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: ${props => props.theme.buttonText};
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
    background: ${props => shade(0.2, props.theme.buttonColor)};
  }
`;
