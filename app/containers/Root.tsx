import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { ipcRenderer } from 'electron';
import { Store } from '../reducers/types';
import Routes from '../Routes';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const DragAppRegion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${({ drag }) => (drag ? 25 : 0)}px;
  -webkit-app-region: drag;
`;

const ContentRegion = styled.div`
  position: absolute;
  top: ${({ drag }) => (drag ? 25 : 0)}px;
  bottom: 0;
  left: 0;
  right: 0;
`;

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  // Only create draggable region at top of window if Mac because is frameless
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    ipcRenderer
      .invoke('process.platform')
      .then(res => {
        if (res === 'darwin') setIsMac(true);
        return null;
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, []);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Wrapper>
          <DragAppRegion drag={isMac} />
          <ContentRegion drag={isMac}>
            <Routes />
          </ContentRegion>
        </Wrapper>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
