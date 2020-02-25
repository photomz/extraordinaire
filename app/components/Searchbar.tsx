import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useActions } from '../utils';
import { setSearch } from '../actions/search';

const Searchbar = ({ fireAction }) => {
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
};
