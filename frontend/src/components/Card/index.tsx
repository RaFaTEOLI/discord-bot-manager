import React from 'react';

import { CardContainer, CardContent, InfoContainer } from './styles';

type CommandCardProps = {
  command: string;
  description: string;
  handleClick?: any;
};

const CommandCard: React.FC<CommandCardProps> = ({
  command,
  description,
  handleClick,
}) => (
  <CardContainer onClick={handleClick}>
    <CardContent>
      <h4>{command}</h4>
      <InfoContainer>
        <span>{description}</span>
      </InfoContainer>
    </CardContent>
  </CardContainer>
);

export default CommandCard;
