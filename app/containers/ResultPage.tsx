import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';

import $ from '../styles/global';
import IPC from '../constants/ipcActions.json';
import { SearchState } from '../reducers/types';
import { useDebounce } from '../utils';

import Searchbar from '../components/Searchbar';
import Sorter from '../components/Sorter';
import ResultAccordion from '../components/ResultAccordion';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${$.layout.margin2}px;
  width: 100%;
  height: 50%;
`;

// TODO: Finish ResultWrapper css
const ResultWrapper = styled.section`
  margin-top: ${$.layout.margin3}px;
`;

// TODO: Style and make UI, borrow from HackerNews
// TODO: Jest testing for all components
const ResultPage = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const fireSearchCounter = useSelector(state => state.counter);
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const debouncedCounter = useDebounce(fireSearchCounter, 1000);
  useEffect(() => {
    (async () => {
      const allRes = await ipcRenderer.invoke(IPC.DB.SEARCH, searchOptions);
      if (!allRes.length) setResults([]);
      if (allRes.length > 200) {
        // eslint-disable-next-line no-console
        console.warn('Query overwhelm');
        setResults([]);
        return;
      }
      const newResults = [];
      for (let i = 0; i < allRes.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const data = await ipcRenderer.invoke(IPC.DB.QUERY, allRes[i].path);
        newResults.push({ ...allRes[i], data });
      }
      setResults(newResults);
    })();
  }, [debouncedCounter, searchOptions]);
  // console.log(results);
  return (
    <Wrapper>
      <Searchbar />
      <Sorter />
      <ResultWrapper>
        {results.map(({ key, ...props }) => (
          // TODO: Proper props passing and validation
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ResultAccordion key={key} {...props} />
        ))}
      </ResultWrapper>
    </Wrapper>
  );
};

export default ResultPage;
