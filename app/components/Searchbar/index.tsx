import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useActions } from '../../utils';
import { setSearch } from '../../actions/search';

import InputOption from './InputOption';
import RadioOptions from './RadioOptions';
import Checkmark from './Checkmark';
import $ from '../../styles/global';

const Wrapper = styled.section`
  margin-top: ${$.layout.margin1}px;
`;

const Chevron = styled.div`
  height: 10px;
  width: 10px;
`;

const PillContainer = styled.div`
  width: 200px;
  border: 50px solid ${$.color.gray}px;
  box-shadow: ${$.dropShadow};
`;

const PillInput = styled.input`
  display: block;
  width: calc(100% - ${2 * $.layout.margin4}px);
  padding: $.layout() .padding4;
  margin-bottom: ${$.layout.margin4}px;
  height: 18;
  font-family: 'Aileron Semibold', sans-serif;
  border-width: 0;
  border-radius: 10px;
  box-shadow: ${$.dropShadow.normal};
  text-align: left;
  vertical-align: middle;
  background-color: ${$.color.white};
  font-size: ${$.font.size.header};
  text-decoration: none;
  color: ${$.color.black};
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
  const [searchText, setSearchText] = useState('Communism');
  const [year, setYear] = useState('2019');
  const [paperType, setPaperType] = useState('qp');
  const [season, setSeason] = useState('w');
  const [timezone, setTimezone] = useState('1');
  const [questionNumber, setQuestionNumber] = useState('8');
  const [questionLetter, setQuestionLetter] = useState('a');
  const [isRegex, setIsRegex] = useState(false);
  const [isTextSearch, setIsTextSearch] = useState(true);

  const setSearchAction = useActions(setSearch);
  useEffect(() => {
    if (fireAction) {
      setSearchAction({
        keyword: searchText,
        year,
        paperType,
        season,
        timezone,
        number: questionNumber,
        letter: questionLetter,
        isRegex,
        isTextSearch
      });
    }
  }, [fireAction]);
  return (
    <Wrapper>
      <PillContainer>
        <PillInput type="text" value={searchText} onChange={setSearchText} />
        <Chevron>Arrow</Chevron>
      </PillContainer>
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
