import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 735px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FilterContainer = styled.div`
  width: 85%;
  @media screen and (max-width: 735px) {
    width: 70%;
  }
`;

export const ButtonContainer = styled.div`
  width: 15%;
  @media screen and (max-width: 735px) {
    width: 30%;
  }
`;

export const ListCommandsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 200vh;

  @media screen and (max-width: 735px) {
    width: 90%;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  input,
  select {
    margin-bottom: 3px;
  }
  a {
    margin-top: 6px;
  }
`;
