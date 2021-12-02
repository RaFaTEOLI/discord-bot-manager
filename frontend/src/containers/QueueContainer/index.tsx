import { useState, useEffect } from 'react';

import Button from '../../components/Button';

import { Container } from './styles';

import api from '../../services/api';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

interface IQueue {
  name: string;
  author: string;
  duration: string;
  url: string;
  thumbnail: string;
}

interface QueueProps {
  show: boolean;
  hideModal: () => void;
}

const QueueContainer = ({ show, hideModal }: QueueProps) => {
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<IQueue[]>([]);

  const updateQueue = async () => {
    const botName = process.env.REACT_APP_BOT_NAME;
    const imgUrl = `https://robohash.org/${botName}?gravatar=hashed`;
    const webHook = process.env.REACT_APP_WEBHOOK;
    if (webHook) {
      const requestBody = {
        username: `${botName} Web`,
        avatar_url: imgUrl,
        content: '!queue',
      };
      await api.post(webHook, requestBody);
    }
  };

  const fetchQueue = async () => {
    setLoading(true);
    await updateQueue();
    const response = await api.get('queue');
    setQueue(response.data);
    setLoading(false);
  };

  const refresh = async () => {
    await fetchQueue();
  };

  useEffect(() => {
    fetchQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={show} title="Queue" handleClose={hideModal}>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!queue.length ? (
            <>Nothing on queue, try refreshing...</>
          ) : (
            <>Only Showing Next 10 Songs</>
          )}
          {/* eslint-disable-next-line */}
          {queue.map((song, i) => {
            const songOrder = i + 1;
            if (songOrder < 11) {
              if (songOrder === 1) {
                return (
                  <p
                    key={songOrder}
                  >{`▶️  #${songOrder} | ${song.name} - ${song.author}`}</p>
                );
              } else {
                return (
                  <p
                    key={songOrder}
                  >{`⏭️  #${songOrder} | ${song.name} - ${song.author}`}</p>
                );
              }
            }
          })}

          <Button onClick={refresh}>Refresh</Button>
        </Container>
      )}
    </Modal>
  );
};

export default QueueContainer;
