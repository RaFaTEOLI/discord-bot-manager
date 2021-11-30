import styled from 'styled-components';

export const PlayerContainer = styled.div`
  background-color: ${props => props.theme.title};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 95px;
  border-radius: 5px;
  padding: 10px;

  @media screen and (max-width: 610px) {
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }
`;

export const Playing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40vh;
  img {
    height: 58px;
  }
  p {
    font-size: 24px;
    color: #000;
    margin-bottom: 60px;
    padding: 5px;
  }

  @media screen and (max-width: 610px) {
    justify-content: center;
    img {
      height: 40px;
    }
    p {
      margin-top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0px;
      padding: 0px;
    }
  }
`;

export const Controls = styled.div`
  padding: 10px;

  img {
    margin: 8px;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 803px) {
    img {
      height: 30px;
      width: 30px;
    }
  }
`;

export const MusicTitle = styled.div`
  p {
    color: #000;
    font-weight: 600;
    padding: 0px;
    margin: 0px;
    text-align: right;
  }

  @media screen and (max-width: 610px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
`;

export const Music = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40vh;

  img {
    margin-left: 8px;
  }

  @media screen and (max-width: 610px) {
    justify-content: center;
    img {
      display: none;
    }
  }
`;
