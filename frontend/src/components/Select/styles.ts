import styled from 'styled-components';

export const SelectContainer = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  color: #000;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 7px;
  height: 40px;
  width: 100%;
  background-color: ${props => props.theme.inputBackground};

  &:focus {
    outline: none;
  }
`;
