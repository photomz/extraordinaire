import styled from 'styled-components';
import $ from '../../styles/global';

export const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-family: Aileron Heavy, sans-serif;
  font-size: ${$.font.size.header}px;
  padding: 0;
  height: calc(100% - 4px);
  width: ${$.searchButtonWidth}px;
  box-sizing: content-box;
  border: 2px solid ${$.color.gray1};
  border-radius: 99px;
  text-align: center;
  background-color: ${$.color.white};
  &:active,
  &:hover {
    color: ${$.color.white};
    background-color: ${$.color.turquoise2};
  }
`;

export const PillInput = styled.input`
  display: block;
  width: calc(100% - ${$.layout.padding4}px);
  height: 100%;
  margin: 0;
  padding: 0;
  padding-left: ${$.layout.padding4}px;
  border-width: 0;
  border-radius: 999px;
  font-family: 'Aileron Semibold', sans-serif;
  text-decoration: none;
  text-align: left;
  background-color: ${$.color.white};
  font-size: ${$.font.size.header}px;
  color: ${$.color.black};
  &:focus,
  &:hover {
    outline: none;
  }
`;

export const PillMain = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch; */
  position: relative;
  width: 90%;
  max-width: 700px;
  height: ${$.searchbarHeight}px;
  box-sizing: border-box;
  margin-bottom: ${$.layout.margin4}px;
  padding: 0 ${$.layout.padding4}px;
  border-radius: ${$.border.radius1}px;
  border-width: 0;
  box-shadow: ${$.dropShadow.normal};
  vertical-align: middle;
  background-color: ${$.color.white};
  &:focus,
  &:hover {
    box-shadow: ${$.dropShadow.repressed};
  }
  ${({ connectBorder }) =>
    connectBorder &&
    `border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: ${$.dropShadow.oppressed}`}
`;

export const PillExtension = styled.div`
  position: absolute;
  top: ${$.searchbarHeight}px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  border-radius: ${$.border.radius1}px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 2px solid ${$.color.gray1};
  width: 100%;
  box-sizing: border-box;
  padding: ${$.layout.padding5}px ${$.layout.padding4}px;
  box-shadow: ${$.dropShadow.oppressed};
  background-color: ${$.color.white};
  display: flex;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ${$.easingFn.accelerate};
`;

export const InputContainer = styled.div`
  width: calc(100% - ${$.searchButtonWidth}px);
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;
