import React, { useContext } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import $ from '../../styles/global';
import { changeSearchOption } from '../../actions/search';
import { useActions } from '../../utils';
import context from './context';
import Chevron from '../Chevron';

const Wrapper = styled.div`
  width: calc(100% - ${$.searchButtonWidth}px);
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - ${$.layout.padding4}px);
  height: 100%;
  margin: 0;
  padding: 0;
  padding-left: ${$.layout.padding4}px;
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

const PillInput = () => {
  const { setIsExtended } = useContext(context);
  const keyword = useSelector(state => state.search.keyword);
  const changeKeyword = useActions(changeSearchOption);
  return (
    <Wrapper>
      <Input
        type="text"
        value={keyword}
        onChange={e => changeKeyword({ keyword: e.target.value })}
      />
      <Chevron handler={() => setIsExtended(prev => !prev)} />
    </Wrapper>
  );
};

export default PillInput;
