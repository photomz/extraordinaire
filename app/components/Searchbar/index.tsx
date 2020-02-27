import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';
import { SearchState } from '../../reducers/types';

import Chevron from '../Chevron';
import SearchButton from '../SearchButton';
import InputOption from './InputOption';
import RadioOptions from './RadioOptions';
import Checkmark from './Checkmark';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${$.layout.margin2}px;
  width: 100%;
`;

const PillMain = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch; */
  position: relative;
  width: 90%;
  max-width: 700px;
  height: 50px;
  margin-bottom: ${$.layout.margin4}px;
  padding: 0 ${$.layout.padding4}px;
  border-radius: 999px;
  border-width: 0;
  box-shadow: ${$.dropShadow.normal};
  vertical-align: middle;
  background-color: ${$.color.white};
  &:focus,
  &:hover {
    box-shadow: ${$.dropShadow.repressed};
  }
`;

const PillExtension = styled.div`
  width: 400px;
  height: 50px;
  border: 20px solid ${$.color.gray2}px;
  box-shadow: ${$.dropShadow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${$.layout.margin1}px;
`;

const PillInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(
    100% - ${$.layout.padding3}px - 125px - ${3 * $.layout.padding4}px
  );
  height: 100%;
  margin: 0;
  padding: 0;
  padding-left: ${$.layout.padding3}px;
  border-width: 0;
  border-radius: 999px;
  font-family: 'Aileron Semibold', sans-serif;
  text-decoration: none;
  text-align: left;
  background-color: ${$.color.white};
  font-size: ${$.font.size.header}px;
  color: ${$.color.black};
  &:focus,
  &:hover {
    outline: none;
  }
`;

const Searchbar = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [searchText, setSearchText] = useState<string>('Communism');
  // TODO: Invoke ipc in new results page, receive args from redux
  // TODO: Componentalise PillInput
  return (
    <Wrapper>
      <PillMain>
        <PillInput
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Chevron />
        <SearchButton
          onClick={() => {
            // eslint-disable-next-line promise/catch-or-return
            ipcRenderer
              .invoke(IPC.DB.SEARCH, { keyword: searchText, ...searchOptions })
              .then(res => console.log(res));
          }}
        >
          Search
        </SearchButton>
        <PillExtension>
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
        </PillExtension>
      </PillMain>
    </Wrapper>
  );
};

export default Searchbar;
