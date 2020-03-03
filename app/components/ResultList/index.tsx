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
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  useEffect(() => {
    (async () => {
      const allRes = await ipcRenderer.invoke(IPC.DB.SEARCH, searchOptions);
      allRes.forEach(async res => {
        const data = await ipcRenderer.invoke(IPC.DB.QUERY, res.path);
        setResults(prev => {
          const newResults = [...prev];
          // TODO: Fix reducer, only appending first element
          newResults.push({ ...res, data });
          return newResults;
        });
      });
    })();
  }, []);
  console.log(results);
  // TODO: Fix no object show
  return <Wrapper>{results}</Wrapper>;
};

export default ResultList;
