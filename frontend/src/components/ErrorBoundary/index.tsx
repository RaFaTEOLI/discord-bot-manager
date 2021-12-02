import React, { ReactElement } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './styles';

interface ErrorProps {
  hasErrored?: boolean;
  children: ReactElement;
}

type ErrorState = {
  hasErrored?: boolean;
};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error: ErrorProps): ErrorState {
    // eslint-disable-next-line
    console.log(error);
    // Process the error
    return { hasErrored: true };
  }

  render(): JSX.Element {
    const { hasErrored } = this.state;
    const { children } = this.props;
    if (hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/qIufhof.png" />
          <ErrorImageText>
            Sorry, something went wrong with this page
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
