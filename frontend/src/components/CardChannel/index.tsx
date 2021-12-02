import React from 'react';

import { CardContainer, CardContent } from './styles';

type ChannelCardProps = {
  name: string;
};

const ChannelCard: React.FC<ChannelCardProps> = ({ name }) => (
  <CardContainer>
    <CardContent>
      <h4>{name}</h4>
    </CardContent>
  </CardContainer>
);

export default ChannelCard;
