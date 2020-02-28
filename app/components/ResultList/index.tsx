/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';

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
  const [rawResults, setRawResults] = useState<string[][] | null>(null);
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    ipcRenderer
      .invoke(IPC.DB.SEARCH, searchOptions)
      .then(res => setRawResults(res))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  }, []);
  useEffect(() => {
    if (rawResults === null) return;
    rawResults.forEach(rawRes => {
      ipcRenderer
        .invoke(IPC.DB.QUERY, rawRes.slice(0, rawRes.length - 1))
        .then(res => {
          setResults(prev => {
            const newResults = [...prev];
            newResults.push(res);
            return newResults;
          });
          return null;
        })
        // eslint-disable-next-line no-console
        .catch(e => console.error(e));
    });
  }, [rawResults]);
  return <Wrapper>{results}</Wrapper>;
};

export default ResultList;
