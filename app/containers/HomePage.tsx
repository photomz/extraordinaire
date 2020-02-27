import React from 'react';
import styled from 'styled-components';

import Searchbar from '../components/Searchbar';
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

const HomePage = () => (
  <Wrapper>
    <Landing src={Logo}>The Extraordinaire</Landing>
    <Searchbar />
  </Wrapper>
);

export default HomePage;
