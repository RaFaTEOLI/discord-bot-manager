import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterContainer = styled.div`
  width: 85%;
`;

export const ButtonContainer = styled.div`
  width: 15%;
`;

export const ListCommandsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
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
