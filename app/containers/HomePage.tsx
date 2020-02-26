import React, { useState } from 'react';
import styled from 'styled-components';

import Searchbar from '../components/Searchbar';
import SearchButton from '../components/SearchButton';
import Landing from '../components/Landing';

import Logo from '../../resources/icon.png';

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const HomePage = () => {
  const [fireAction, setFireAction] = useState(0);
  return (
    <Wrapper>
      <Landing src={Logo}>The Extraordinaire</Landing>
      <Searchbar fireAction={fireAction} />
      <SearchButton onClick={() => setFireAction(prev => prev + 1)}>
        Search
      </SearchButton>
    </Wrapper>
  );
};

export default HomePage;
