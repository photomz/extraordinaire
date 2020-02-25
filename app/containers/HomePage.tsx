import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import Home from '../components/Home';
import IPC from '../constants/ipcActions.json';

const HomePage = () => {
  useEffect(() => {
    ipcRenderer
      .invoke(IPC.DB.SEARCH, { keyword: 'Hitler', paperType: 'qp' })
      // eslint-disable-next-line no-console
      .then(res => console.log(res))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  }, []);
  return <Home />;
};

export default HomePage;
