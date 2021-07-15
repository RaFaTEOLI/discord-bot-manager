import styled from 'styled-components';
import { shade } from 'polished';

export const ModalContainer = styled.div`
  z-index: 998;
  position: fixed; /* Stay in place */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${props => props.theme.modalBackgroundColor};
`;

export const ModalMain = styled.section`
  z-index: 999;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
  font-family: 'Quicksand', sans-serif;
  border-radius: 8px;
  color: ${props => props.theme.text};
  background: ${props => props.theme.background};
  margin-top: 5%;

  @media screen and (max-width: 600px) {
    margin-top: 20%;
    width: 80%;
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    margin-top: 0;
  }
`;

export const CloseButton = styled.span`
  cursor: pointer;
  color: darkcyan;
  font-size: 30px;

  &:hover {
    color: ${shade(0.2, 'darkcyan')};
  }
`;
