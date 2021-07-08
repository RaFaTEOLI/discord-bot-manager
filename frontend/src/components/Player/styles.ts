import styled from 'styled-components';

export const PlayerContainer = styled.div`
  background-color: ${props => props.theme.title};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 95px;
  border-radius: 5px;
  padding: 10px;
`;

export const Playing = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 58px;
  }
  p {
    font-size: 24px;
    color: #000;
    margin-bottom: 60px;
    padding: 5px;
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
`;

export const MusicTitle = styled.div`
  p {
    color: #000;
    font-weight: 600;
    padding: 0px;
    margin: 0px;
    text-align: right;
  }
`;

export const Music = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-left: 8px;
  }
`;
