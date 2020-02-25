import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

const Wrapper = styled.div`
  position: absolute;
  top: 30%;
  left: 10px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 5rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
`;

const StyledInput = styled.input`
  -webkit-user-select: text;
  -webkit-app-region: none;
`;

const Home = () => (
  <Wrapper data-tid="container">
    <Subtitle>Home</Subtitle>
    <StyledLink to={routes.COUNTER}>to Counter</StyledLink>
    <StyledInput />
  </Wrapper>
);

export default Home;
