/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { useDebounce } from '../../utils';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';
import { SearchState } from '../../reducers/types';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${$.layout.margin2}px;
  width: 100%;
  height: 50%;
`;

// TODO: Style and make UI, borrow from HackerNews
// TODO: Object result state, not array
// NOTE: Return uuids from IPC main DONE
// TODO: Jest testing for all components
const ResultList = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const fireSearchCounter = useSelector(state => state.counter);
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const debouncedCounter = useDebounce(fireSearchCounter, 1000);
  useEffect(() => {
    (async () => {
      // console.log(searchOptions);
      const allRes = await ipcRenderer.invoke(IPC.DB.SEARCH, searchOptions);
      if (!allRes.length) setResults([]);
      if (allRes.length > 200) {
        console.warn('Query overwhelm');
        setResults([]);
        return;
      }
      for (let i = 0; i < allRes.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const data = await ipcRenderer.invoke(IPC.DB.QUERY, allRes[i].path);
        setResults(prev => {
          const newResults = i ? [...prev] : [];
          // TODO: Fix reducer, only appending first element
          newResults.push({ ...allRes[i], data });
          return newResults;
        });
      }
    })();
  }, [debouncedCounter, searchOptions]);
  console.log(results);
  return <Wrapper>Oof</Wrapper>;
};

export default ResultList;
