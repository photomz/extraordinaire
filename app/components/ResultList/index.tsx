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

const ResultList = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [rawResults, setRawResults] = useState<string[][] | null>(null);
  useEffect(() => {
    ipcRenderer
      .invoke(IPC.DB.SEARCH, searchOptions)
      .then(res => setRawResults(res))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  }, []);
  return <Wrapper>{rawResults}</Wrapper>;
};

export default ResultList;
