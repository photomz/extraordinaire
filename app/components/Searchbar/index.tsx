import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';
import { SearchState } from '../../reducers/types';

import Chevron from '../Chevron';
import {
  SearchButton,
  PillMain,
  PillExtension,
  PillInput,
  InputContainer
} from './styled';
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

const Searchbar = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [searchText, setSearchText] = useState<string>('Communism');
  // TODO: Invoke ipc in new results page, receive args from redux
  // TODO: Componentalise PillInput
  return (
    <Wrapper>
      <PillMain>
        <InputContainer>
          <PillInput
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Chevron />
        </InputContainer>

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
