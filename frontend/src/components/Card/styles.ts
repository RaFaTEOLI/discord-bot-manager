import styled from 'styled-components';

export const CardContainer = styled.div`
  margin-top: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: 0.3s;
  width: 250px;
  height: 80px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: ${props => props.theme.navbarColor};

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 5px;

  h4 {
    font-size: 22px;
    padding: 0;
    margin: 0;
  }
`;

export const InfoContainer = styled.div`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;

  span {
    color: ${props => props.theme.descriptionColor};
  }
`;
