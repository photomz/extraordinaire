import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useActions } from '../../utils';
import { changeSearchOption } from '../../actions/search';
import $ from '../../styles/global';

const Wrapper = styled.div`
  position: relative;
  min-width: 50px;
  margin-bottom: ${$.layout.margin3}px;
  & * {
    box-sizing: border-box;
  }
`;

const Label = styled.h4`
  color: ${$.color.gray2};
  margin: 0;
  font-size: ${$.font.size.subheader}px;
  font-family: 'Aileron Semibold', sans-serif;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: all 0.5s ${$.easingFn.standard};
  ${({ textExists }) =>
    textExists &&
    `    top: -10px;
    font-size: ${$.font.size.paragraph}px;
    color: ${$.color.gray2};`}
`;

const BottomBar = styled.span`
  position: relative;
  display: block;
  width: 100%;
  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${$.color.blue1};
    transition: all 0.5s ${$.easingFn.standard};
  }
  &::before {
    left: 50%;
  }
  &::after {
    right: 50%;
  }
`;

const Highlighter = styled.span`
  position: absolute;
  height: 60%;
  width: 33%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

const highlight = keyframes`
  from {
    background: ${$.color.blue1};
  }
  to {
    width: 0;
    background: transparent;
  }
`;

const Input = styled.input`
  font-size: ${$.font.size.subheader}px;
  font-family: 'Aileron Semibold', sans-serif;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  background-color: ${$.color.white};
  border-bottom: 1px solid ${$.color.gray2};
  &:focus {
    outline: none;
  }
  &:focus ~ ${Label} {
    top: -10px;
    font-size: ${$.font.size.paragraph}px;
    color: ${$.color.gray2};
  }
  &:focus ~ ${Highlighter} {
    animation: ${highlight} 0.5s ${$.easingFn.standard};
  }
  &:focus ~ ${BottomBar}::before, &:focus ~ ${BottomBar}::after {
    width: 50%;
  }
`;

interface Props {
  children: Node | string;
  selectorName: string;
}

const InputOption = ({ children, selectorName }: Props) => {
  const input = useSelector(state => state.search[selectorName]);
  const changeInputAction = useActions(changeSearchOption);
  return (
    <Wrapper>
      <Input
        type="text"
        value={input}
        onChange={e => changeInputAction({ [selectorName]: e.target.value })}
      />
      <Highlighter />
      <BottomBar />
      <Label textExists={input !== ''}>{children}</Label>
    </Wrapper>
  );
};

export default InputOption;
