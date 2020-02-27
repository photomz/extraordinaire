import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { useActions } from '../../utils';
import { setSearch } from '../../actions/search';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';

import InputOption from './InputOption';
import RadioOptions from './RadioOptions';
import Checkmark from './Checkmark';
import Chevron from '../Chevron';
import { SearchState } from '../../reducers/types';

const Wrapper = styled.section`
  margin-top: ${$.layout.margin2}px;
`;

const PillInput = styled.input`
  display: block;
  width: calc(100% - ${2 * $.layout.margin4}px);
  padding: ${$.layout.padding4}px;
  margin-bottom: ${$.layout.margin4}px;
  height: 18;
  font-family: 'Aileron Semibold', sans-serif;
  border-width: 0;
  border-radius: 999px;
  box-shadow: ${$.dropShadow.normal};
  text-align: left;
  vertical-align: middle;
  background-color: ${$.color.white};
  font-size: ${$.font.size.header}px;
  text-decoration: none;
  color: ${$.color.black};
  &:focus,
  &:hover {
    outline: none;
    box-shadow: ${$.dropShadow.repressed};
  }
`;

const OptionsContainer = styled.div`
  width: 400px;
  height: 50px;
  border: 20px solid ${$.color.gray2}px;
  box-shadow: ${$.dropShadow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  fireAction: number;
}

const Searchbar = ({ fireAction = 0 }: Props) => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [searchText, setSearchText] = useState<string>('Communism');
  useEffect(() => {
    // TODO: Invoke ipc in new results page, receive args from redux
    // TODO: Integrate isRegex and isTextSearch in ipcMain and ipcListener
    // TODO: Globally disable eslint rule below
    // eslint-disable-next-line promise/catch-or-return
    ipcRenderer
      .invoke(IPC.DB.SEARCH, { keyword: searchText, ...searchOptions })
      .then(res => console.log(res));
  }, [fireAction]);
  return (
    <Wrapper>
      <PillInput
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <Chevron />
      <OptionsContainer>
        <InputOption selectorName="paperType">Paper Type</InputOption>
        <InputOption selectorName="year">Year</InputOption>
        <RadioOptions
          optionLabels={['March', 'Spring', 'Winter']}
          options={['m', 's', 'w']}
          selectorName="season"
        >
          Season
        </RadioOptions>
        <RadioOptions options={['1', '2', '3']} selectorName="timezone">
          Time Zone
        </RadioOptions>
        <InputOption selectorName="number">Question Number</InputOption>
        <RadioOptions options={['a', 'b', 'c']} selectorName="letter">
          Question Letter
        </RadioOptions>
        <Checkmark selectorName="isRegex">Regex</Checkmark>
        <Checkmark selectorName="isTextSearch">Search By Text</Checkmark>
      </OptionsContainer>
    </Wrapper>
  );
};

export default Searchbar;
