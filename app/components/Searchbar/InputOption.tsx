import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useActions } from '../../utils';
import { changeSearchOption } from '../../actions/search';
import $ from '../../styles/global';

const Wrapper = styled.div``;

const Label = styled.h4`
  color: ${$.color.black};
`;

const Input = styled.input`
  width: 50px;
  border: 0 solid #000;
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
      <Label>{children}</Label>
      <Input
        type="text"
        value={input}
        onChange={e => changeInputAction({ [selectorName]: e.target.value })}
      />
    </Wrapper>
  );
};

export default InputOption;
