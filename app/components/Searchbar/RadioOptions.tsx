import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import shortid from 'shortid';
import { useActions } from '../../utils';
import { changeSearchOption } from '../../actions/search';
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
  optionLabels: string[];
  selectorName: string;
}

const RadioOptions = ({
  children,
  options,
  optionLabels = options,
  selectorName
}: Props) => {
  const selectedOption = useSelector(state => state.counter[selectorName]);
  const changeOptionAction = useActions(changeSearchOption);
  return (
    <Wrapper>
      <Label>{children}</Label>
      <PillContainer>
        {options.map((option, i) => (
          <PillOption
            key={shortid.generate()}
            onClick={() => changeOptionAction({ [selectorName]: option })}
            isSelected={selectedOption === option}
          >
            {optionLabels[i]}
          </PillOption>
        ))}
      </PillContainer>
    </Wrapper>
  );
};

export default RadioOptions;
