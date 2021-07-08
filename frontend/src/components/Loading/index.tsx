import React from 'react';

import { LoaderContainer, Loader } from './styles';

const Loading: React.FC = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default Loading;
