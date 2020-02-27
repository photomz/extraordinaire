import styled from 'styled-components';
import $ from '../styles/global';

const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-family: Aileron Heavy, sans-serif;
  font-size: ${$.font.size.header}px;
  padding: 0 ${$.layout.padding4}px;
  height: calc(100% - 4px);
  width: 125px;
  box-sizing: content-box;
  border: 2px solid ${$.color.gray1};
  border-radius: 99px;
  text-align: center;
  background-color: ${$.color.white};
  &:active,
  &:hover {
    color: ${$.color.white};
    box-shadow: ${$.dropShadow.repressed};
    background-color: ${$.color.turquoise2};
  }
`;

export default SearchButton;
