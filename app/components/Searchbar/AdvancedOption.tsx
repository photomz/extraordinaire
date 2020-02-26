import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Label = styled.h4``;

const Input = styled.input``;

interface Props {
  children: Node | string;
  value: string;
  setValue: () => void;
}

const AdvancedOption = ({ children, value, setValue }: Props) => (
  <Wrapper>
    <Label>{children}</Label>
    <Input type="text" value={value} onChange={setValue} />
  </Wrapper>
);

export default AdvancedOption;
