import axios from 'axios';
import { useEffect, useState } from 'react';
import ChannelCard from '../CardChannel';
import MemberCard from '../CardMember';
import { SidebarContainer } from './styles';

interface IMember {
  id: string;
  username: string;
  status: string;
  avatar_url: string;
  game?: {
    name: string;
  };
}

interface IChannel {
  id: string;
  name: string;
}

const serverId = process.env.REACT_APP_DISCORD_SERVER_ID;
const apiUrl = `https://discord.com/api/guilds/${serverId}/widget.json`;

const Sidebar = () => {
  const [members, setMembers] = useState<Array<IMember>>();
  const [channels, setChannels] = useState<Array<IChannel>>();

  const loadServer = () => {
    // eslint-disable-next-line no-console
    console.log('Loading Server...');
    axios.get(apiUrl).then(response => {
      // eslint-disable-next-line no-console
      console.log(response.data);
      setMembers(response.data.members);
      setChannels(response.data.channels);
    });
  };

  useEffect(() => {
    loadServer();

    const interval = setInterval(() => {
      loadServer();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return members || channels ? (
    <SidebarContainer>
      {members && (
        <>
          <h4>Available Members</h4>
          {members?.map((member: IMember) => (
            <MemberCard
              key={member.id}
              member={member.username}
              avatar={member.avatar_url}
              status={member.status}
              game={member.game}
            />
          ))}
        </>
      )}

      {channels && (
        <>
          <h4>Channels</h4>
          {channels?.map((channel: IChannel) => (
            <ChannelCard key={channel.id} name={channel.name} />
          ))}
        </>
      )}
    </SidebarContainer>
  ) : null;
};

export default Sidebar;
