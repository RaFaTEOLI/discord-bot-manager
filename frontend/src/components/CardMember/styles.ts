import styled from 'styled-components';
import { shade } from 'polished';

// eslint-disable-next-line
interface StatusProps {
  status: string;
}

export const CardContainer = styled.div`
  margin-top: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  transition: 0.3s;
  width: 250px;
  overflow: hidden;
  margin-bottom: 1px;
  background-color: ${props => props.theme.memberCard};

  &:hover {
    background-color: ${props => shade(0.2, props.theme.memberCard)};
  }
`;

export const CardContent = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  padding: 1rem;

  img {
    border: 2px solid ${props => (props.status === 'online' ? 'green' : 'red')};
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }

  h4 {
    font-size: 12px;
    padding: 0;
    margin: 0;
  }
`;

export const InfoContainer = styled.div<StatusProps>`
  font-size: 10px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;

  span {
    color: ${props => (props.status === 'online' ? '#FCBF49' : 'red')};
  }
`;
