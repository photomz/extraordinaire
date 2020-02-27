import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import shortid from 'shortid';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import $ from '../../styles/global';
import { changeSearchOption } from '../../actions/search';
import { useActions } from '../../utils';

const Wrapper = styled.div`
  margin: ${$.layout.margin3}px;
`;

const Header = styled.div`
  font-family: 'Aileron Semibold', sans-serif;
  color: ${$.color.gray2};
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin: ${$.layout.margin3}px ${$.layout.margin5}px;
`;

const OuterButton = styled.span`
  display: block;
  border: 3px solid
    ${({ isSelected }) => (isSelected ? $.color.turquoise2 : $.color.blue2)};
  width: 20px;
  height: 20px;
  margin: 10px;
  border-radius: 999px;
  background-color: ${$.color.white};
`;

const InnerButton = styled.span`
  vertical-align: center;
  display: block;
  height: 16px;
  margin: 2px;
  border-radius: 999px;
`;

const Radio = styled.label`
  display: inline-block;
  font-family: 'Aileron Semibold', sans-serif;
  font-size: ${$.font.size.subheader};
  margin-bottom: ${$.layout.margin5}px;
  cursor: pointer;
  &:hover ${InnerButton} {
    transform: scale(0.5);
    opacity: 0.5;
  }
  ${InnerButton} {
    transform: scale(${({ isSelected }) => (isSelected ? 1 : 0)});
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
    background-color: ${({ isSelected }) =>
      isSelected ? $.color.turquoise1 : $.color.blue2};
    transition: all 0.25s ease-in-out;
  }
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
  const selectedOption = useSelector(state => state.search[selectorName]);
  const changeOptionAction = useActions(changeSearchOption);
  return (
    <Wrapper>
      <Header>{children}</Header>
      <RadioContainer>
        {options.map((option, i) => (
          <Radio
            key={shortid.generate()}
            onClick={() => changeOptionAction({ [selectorName]: option })}
            isSelected={selectedOption === option}
          >
            <OuterButton isSelected={selectedOption === option}>
              <InnerButton />
            </OuterButton>
          </Radio>
        ))}
      </RadioContainer>
    </Wrapper>
  );
};

export default RadioOptions;
