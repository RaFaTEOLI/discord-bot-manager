import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SwitchContainer = styled.div`
  a {
    color: ${props => props.theme.text};
    text-decoration: none;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  display: block;
`;
