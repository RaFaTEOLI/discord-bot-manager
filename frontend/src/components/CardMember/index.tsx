import React from 'react';

import { CardContainer, CardContent, InfoContainer } from './styles';

type MemberCardProps = {
  member: string;
  avatar: string;
  status: string;
  game?: {
    name: string;
  };
};

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  avatar,
  status,
  game,
}) => (
  <CardContainer>
    <CardContent status={status}>
      <img src={avatar} alt={`${member} Avatar`} />
      <div>
        <h4>{member}</h4>
        <InfoContainer status={status}>
          <span>
            {status === 'dnd' ? 'Busy' : 'Online'}
            {game?.name && ` - ${game.name}`}
          </span>
        </InfoContainer>
      </div>
    </CardContent>
  </CardContainer>
);

export default MemberCard;
