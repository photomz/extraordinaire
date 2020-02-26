import React, { useState, useEffect } from 'react';
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
  border: 20px solid ${$.color.gray}px;
  box-shadow: ${$.dropShadow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  fireAction: boolean;
}

const Searchbar = ({ fireAction = false }: Props) => {
  const [searchText, setSearchText] = useState<string>('Communism');
  const [year, setYear] = useState<string>('2019');
  const [paperType, setPaperType] = useState<string>('qp');
  const [season, setSeason] = useState<string>('w');
  const [timezone, setTimezone] = useState<string>('1');
  const [questionNumber, setQuestionNumber] = useState<string>('8');
  const [questionLetter, setQuestionLetter] = useState<string>('a');
  const [isRegex, setIsRegex] = useState<boolean>(false);
  const [isTextSearch, setIsTextSearch] = useState<boolean>(true);

  const setSearchAction = useActions(setSearch);
  useEffect(() => {
    if (fireAction) {
      const searchRequest = {
        keyword: searchText,
        year,
        paperType,
        season,
        timezone,
        number: questionNumber,
        letter: questionLetter,
        isRegex,
        isTextSearch
      };
      setSearchAction(searchRequest);
      // TODO: Invoke ipc in new results page, receive args from redux
      // TODO: Integrate isRegex and isTextSearch in ipcMain and ipcListener
      // TODO: Globally disable eslint rule below
      // eslint-disable-next-line promise/catch-or-return
      ipcRenderer
        .invoke(IPC.DB.SEARCH, searchRequest)
        .then(res => console.log(res));
    }
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
        <InputOption value={paperType} setValue={setPaperType}>
          Paper Type
        </InputOption>
        <InputOption value={year} setValue={setYear}>
          Year
        </InputOption>
        <RadioOptions
          value={season}
          setValue={setSeason}
          labels={['March', 'Spring', 'Winter']}
          options={['m', 's', 'w']}
        >
          Season
        </RadioOptions>
        <RadioOptions
          value={timezone}
          setValue={setTimezone}
          options={['1', '2', '3']}
        >
          Time Zone
        </RadioOptions>
        <InputOption value={questionNumber} setValue={setQuestionNumber}>
          Question Number
        </InputOption>
        <RadioOptions
          value={questionLetter}
          setValue={setQuestionLetter}
          options={['a', 'b', 'c']}
        >
          Question Letter
        </RadioOptions>
        <Checkmark isChecked={isRegex} setIsChecked={setIsRegex}>
          Regex
        </Checkmark>
        <Checkmark isChecked={isTextSearch} setIsChecked={setIsTextSearch}>
          Search By Text
        </Checkmark>
      </OptionsContainer>
    </Wrapper>
  );
};

export default Searchbar;
