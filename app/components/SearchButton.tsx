import styled from 'styled-components';
import $ from '../styles/global';

const SearchButton = styled.button`
  font-family: Aileron Regular, sans-serif;
  text-transform: uppercase;
  font-size: ${$.font.size.header}px;
  box-sizing: border-box;
  width: 90%;
  padding: ${$.layout.padding3}px 0;
  border: 0 solid #000;
  border-radius: 10px;
  box-shadow: ${$.dropShadow.normal};
  text-align: center;
  background-color: ${$.color.white};
  &:active,
  &:hover {
    color: ${$.color.white};
    box-shadow: ${$.dropShadow.repressed};
    background-color: ${$.color.turquoise};
  }
`;

export default SearchButton;
