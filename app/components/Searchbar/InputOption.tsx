import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Label = styled.h4``;

const Input = styled.input`
  width: 50px;
  border: 0 solid #000;
`;

interface Props {
  children: Node | string;
  value: string;
  setValue: () => void;
}

const InputOption = ({ children, value, setValue }: Props) => (
  <Wrapper>
    <Label>{children}</Label>
    <Input type="text" value={value} onChange={e => setValue(e.target.value)} />
  </Wrapper>
);

export default InputOption;
