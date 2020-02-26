import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useActions } from '../../utils';
import { setSearch } from '../../actions/search';
import AdvancedOption from './AdvancedOption';
import $ from '../../styles/global';

const Wrapper = styled.section``;

const Chevron = styled.div``;

const PillContainer = styled.div``;

const PillInput = styled.input`
  display: block;
  width: calc(100% - ${2 * $.layout.margin4}px);
  padding: $.layout() .padding4;
  margin-bottom: ${$.layout.margin4}px;
  height: 18;
  font-family: 'Aileron Semibold';
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

const OptionsContainer = styled.div``;

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
        <PillInput />
        <Chevron>Arrow</Chevron>
      </PillContainer>
      <OptionsContainer>
        <AdvancedOption>Paper Type</AdvancedOption>
      </OptionsContainer>
    </Wrapper>
  );
};

export default Searchbar;
