import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import $ from '../../styles/global';

const Wrapper = styled.div`
  margin: ${$.layout.margin3}px;
`;

const Label = styled.div`
  font-family: 'Aileron Semibold', sans-serif;
  color: ${$.color.gray};
`;

const PillContainer = styled.div`
  display: inline-block;
`;

const PillOption = styled.div`
  border: 2px ${({ isSelected }) => (isSelected ? 'inset' : 'solid')} gray;
`;

interface Props {
  children: string | Node;
  options: string[];
  labels: string[];
  value: string;
  setValue: () => void;
}

const RadioOptions = ({
  children,
  options,
  labels = options,
  value,
  setValue
}: Props) => (
  <Wrapper>
    <Label>{children}</Label>
    <PillContainer>
      {options.map((option, i) => (
        <PillOption
          key={shortid.generate()}
          onClick={() => setValue(option)}
          isSelected={value === option}
        >
          {labels[i]}
        </PillOption>
      ))}
    </PillContainer>
  </Wrapper>
);

export default RadioOptions;
