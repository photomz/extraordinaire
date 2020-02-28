import React from 'react';
import styled from 'styled-components';

import Searchbar from '../components/Searchbar';
import ResultList from '../components/ResultList';

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ResultPage = () => (
  <Wrapper>
    <Searchbar />
    <ResultList />
  </Wrapper>
);

export default ResultPage;
