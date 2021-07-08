import React from 'react';

import { CardContainer, CardContent, InfoContainer } from './styles';

interface CommandCardProps {
  command: string;
  description: string;
}

const CommandCard: React.FC<CommandCardProps> = ({ command, description }) => {
  return (
    <CardContainer>
      <CardContent>
        <h4>{command}</h4>
        <InfoContainer>
          <span>{description}</span>
        </InfoContainer>
      </CardContent>
    </CardContainer>
  );
};

export default CommandCard;
