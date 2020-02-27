import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useActions } from '../../utils';
import { changeSearchOption } from '../../actions/search';
import $ from '../../styles/global';

const Icon = styled.span`
  position: absolute;
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
  position: absolute;`}
  }
`;

const Wrapper = styled.label`
  font-family: 'PT Sans Regular', sans-serif;
  font-size: ${$.font.size.subheader}px;
  color: ${$.color.black};
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  &:hover ${Icon} {
    background-color: #ccc;
  }
`;

const InvisibleInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

interface Props {
  children: string | Node;
  selectorName: string;
}

const Checkmark = ({ selectorName, children }: Props) => {
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
      <Icon active={isChecked} />
    </Wrapper>
  );
};

export default Checkmark;
