import React, { useState } from 'react';
import styled from 'styled-components';

import $ from '../styles/global';
import Searchbar from '../components/Searchbar';
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

const WelcomeScreen = styled.div`
  margin-bottom: ${$.layout.margin2}px;
`;

const Title = styled.h1`
  font-size: ${$.font.size.title};
  color: ${$.color.gray};
  font-family: 'Aileron Bold', sans-serif;
`;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`;

const SearchButton = styled.button`
  box-sizing: content-box;
  font-family: 'Aileron Bold', sans-serif;
  display: block;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 0 solid #000;
  border-radius: 10px;
  box-shadow: ${$.dropShadow.normal};
  text-align: center;
  background-color: $.color.blue1;
  font-size: ${$.font.size.header};
  text-decoration: none;
  color: ${$.color.white};
  height: 32px;
  width: 50px;
  margin: 0 ${$.layout.margin4}px;
`;

const HomePage = () => {
  const [fireAction, setFireAction] = useState(0);
  return (
    <Wrapper>
      <WelcomeScreen>
        <Title>Extraordinaire</Title>
        <StyledImage src={Logo} />
      </WelcomeScreen>
      <Searchbar fireAction={fireAction} />
      <SearchButton onClick={() => setFireAction(prev => prev + 1)}>
        Search
      </SearchButton>
    </Wrapper>
  );
};

export default HomePage;
