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
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 2px;
  overflow: hidden;
  z-index: 1;
  color: ${$.color.blue1};
  &::before {
    position: absolute;
    content: '';
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
            0 0 0 0 inset
    `};
    animation: ${({ isChecked }) => (isChecked ? checkboxOn : checkboxOff)} 0.6s
      forwards ${$.easingFn.decelerate};
  }
  &::after {
    animation: ${({ isChecked }) => (isChecked ? rippleOn : rippleOff)} 0.3s
      forwards ${$.easingFn.decelerate};
  }
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
    background-color: ${$.color.blue1};
    color: ${({ isChecked }) => (isChecked ? $.color.blue1 : $.color.gray2)};
    animation: ${({ isChecked }) => (isChecked ? rippleOn : rippleOff)} 0.3s
      forwards ${$.easingFn.decelerate};
  }
`;

const Wrapper = styled.label`
  cursor: pointer;
  padding: ${$.layout.margin5}px ${$.layout.margin4}px;
  background: ${$.color.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &&& * {
    box-sizing: border-box;
  }
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
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  padding: 10px 20px;
  transform: translateZ(0);
  &:focus ${Check}::after {
    opacity: 0.2;
  }
`;

const Header = styled.h4`
  font-family: 'PT Sans Regular', sans-serif;
  font-size: ${$.font.size.subheader}px;
  color: ${$.color.black};
  margin: 0;
  margin-left: ${$.layout.margin5}px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Props {
  children: string | Node;
  selectorName: string;
}

const Checkbox = ({ selectorName, children }: Props) => {
  const isChecked = useSelector(state => state.search[selectorName]);
  const changeCheckedAction = useActions(changeSearchOption);
  return (
    <CheckboxContainer>
      <Wrapper>
        <InvisibleInput
          type="checkbox"
          value={isChecked}
          onChange={() => changeCheckedAction({ [selectorName]: !isChecked })}
        />
        <CheckboxMaterial isChecked={isChecked}>
          <Check isChecked={isChecked} />
        </CheckboxMaterial>
        <Header>{children}</Header>
      </Wrapper>
    </CheckboxContainer>
  );
};

export default Checkbox;
