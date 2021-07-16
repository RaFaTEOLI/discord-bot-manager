import styled from 'styled-components';

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 70px;
    height: 70px;
  }

  h1 {
    color: ${props => props.theme.title};
  }
`;

export const HeaderContainer = styled.header`
  top: 0;
  background-color: ${props => props.theme.navbarColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 20px;

  img {
    width: 70px;
    height: 70px;
  }

  h1 {
    color: ${props => props.theme.title};
  }
`;
