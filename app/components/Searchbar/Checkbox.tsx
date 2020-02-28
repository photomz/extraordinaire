import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useActions } from '../../utils';
import { changeSearchOption } from '../../actions/search';
import $ from '../../styles/global';
import {
  checkboxOn,
  checkboxOff,
  rippleOn,
  rippleOff
} from '../../styles/animate';

const Check = styled.span`
  /* transform: translateZ(0) Force 3d rendering */
  position: relative;
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 2px solid;
  border-radius: 2px;
  overflow: hidden;
  z-index: 1;
  color: #2FAEF8;
  &::before {
    position: absolute;
    content: "";
    transform: rotate(45deg);
    display: block;
    margin-top: -4px;
    margin-left: 6px;
    width: 0;
    height: 0;
    box-shadow: ${({ isChecked }) =>
      isChecked
        ? ` 0 0 0 10px,
            10px -10px 0 10px,
            32px 0 0 20px,
            0 32px 0 20px,
            -5px 5px 0 10px,
            20px -12px 0 11px `
        : ` 0 0 0 0,
            0 0 0 0,
            0 0 0 0,
            0 0 0 0,
            0 0 0 0,
            0 0 0 0,
            0 0 0 0 inset;
    `};
    animation: ${({ isChecked }) =>
      isChecked ? checkboxOn : checkboxOff} 0.5s forwards ${
  $.easingFn.decelerate
};
    animation: ${({ isChecked }) => (isChecked ? rippleOff : rippleOn)} 0.5s
      forwards ${$.easingFn.decelerate};
  }

  /* position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${({ active }) => (active ? $.color.blue3 : '#eee')};
  &::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    display: ${({ active }) => (active ? 'block' : 'none')};
    ${({ active }) =>
      active &&
      `content: "";
  position: absolute;`} */
`;

const CheckboxMaterial = styled.span`
  vertical-align: middle;
  position: relative;
  top: 3px;
  &::before {
    position: absolute;
    left: 8px;
    top: 2px;
    content: '';
    height: 4px;
    width: 4px;
    border-radius: 100%;
    z-index: 1;
    opacity: 0;
    margin: 0;
    background-color: #2faef8;
    color: ${({ isChecked }) => (isChecked ? '#2FAEF8' : $.color.gray2)};
    animation: ${({ isChecked }) => (isChecked ? rippleOff : rippleOn)} 0.5s
      forwards ${$.easingFn.decelerate};

    /* transform: scale3d(2.3, 2.3, 1); */
  }
`;

const Wrapper = styled.label`
  font-family: 'PT Sans Regular', sans-serif;
  font-size: ${$.font.size.subheader}px;
  color: ${$.color.black};

  /* display: block; */
  position: relative;

  /* padding-left: 35px;
  margin-bottom: 12px; */
  cursor: pointer;

  /* user-select: none;
  &:hover ${Check} {
    background-color: #ccc;
  } */
`;

// Hide nativer checkbox
const InvisibleInput = styled.input`
  opacity: 0;
  position: absolute;
  margin: 0;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
  left: 0;
  pointer-events: none;
  &:focus + ${Check}::after {
    opacity: 0.2;
  }
`;

interface Props {
  children: string | Node;
  selectorName: string;
  size: number;
}

const Checkbox = ({ selectorName, children, size = 25 }: Props) => {
  const isChecked = useSelector(state => state.search[selectorName]);
  const changeCheckedAction = useActions(changeSearchOption);
  return (
    <Wrapper>
      {children}
      <InvisibleInput
        type="checkbox"
        value={isChecked}
        onChange={() => changeCheckedAction({ [selectorName]: !isChecked })}
      />
      <CheckboxMaterial isChecked={isChecked}>
        <Check isChecked={isChecked} size={size} />
      </CheckboxMaterial>
    </Wrapper>
  );
};

export default Checkbox;
