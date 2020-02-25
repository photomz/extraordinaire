import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import routes from '../constants/routes.json';

import Searchbar from '../components/Searchbar';
import IPC from '../constants/ipcActions.json';

const Wrapper = styled.section``;

const WelcomeScreen = styled.div``;

const Title = styled.h1``;

const StyledImage = styled.img``;

const SearchButton = styled.button``;

const HomePage = () => {
  const [searches, setSearches] = useState('Churchill');
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    ipcRenderer
      .invoke(IPC.DB.SEARCH, { keyword: 'Hitler', paperType: 'qp' })
      .then(res => setSearches(res));
  }, []);
  return (
    <Wrapper>
      <WelcomeScreen>
        <Title />
        <StyledImage />
      </WelcomeScreen>
      <Searchbar />
      <SearchButton />
    </Wrapper>
  );
};

export default HomePage;
