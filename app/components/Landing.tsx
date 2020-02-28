import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInY } from 'react-animations';

import $ from '../styles/global';

const flipAnimation = keyframes`${flipInY}`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Headline = styled.h1`
  font-size: ${$.font.size.headline}px;
  color: ${$.color.white};
  font-family: Aileron Heavy, sans-serif;
  margin: ${$.layout.margin3}px ${$.layout.margin4}px;
  animation: 1s ${flipAnimation};
`;

const LargeLogo = styled.img`
  height: 120px;
  width: 120px;
`;

interface Props {
  src: string;
  children: string | Node;
}

const Landing = ({ src, children }: Props) => (
  <Wrapper>
    <Headline>{children}</Headline>
    <LargeLogo src={src} />
  </Wrapper>
);

export default Landing;
