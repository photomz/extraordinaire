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
// TODO: Return uuids from IPC main
// TODO: Jest testing fro all components
const ResultList = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const debouncedOptions = useDebounce(searchOptions, 1000);
  useEffect(() => {
    (async () => {
      console.log('HEYYYY');
      const allRes = await ipcRenderer.invoke(IPC.DB.SEARCH, searchOptions);
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
  }, [debouncedOptions]);
  console.log(searchOptions);
  // console.log(results);
  // TODO: Fix no object show
  return <Wrapper>Oof</Wrapper>;
};

export default ResultList;
