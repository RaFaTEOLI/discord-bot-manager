import styled from 'styled-components';

export const SidebarContainer = styled.header`
  margin-top: 15px;
  border-radius: 5px;
  margin-left: 5px;
  background-color: ${props => props.theme.sidebarColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 40vh;
  padding: 12px;

  h1 {
    color: ${props => props.theme.title};
  }
`;
