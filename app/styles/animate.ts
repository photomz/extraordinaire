import { css, keyframes } from 'styled-components';
import $ from './global';

export const strikeAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const strike = css`
  position: relative;
  &::after {
    content: ' ';
    position: absolute;
    top: 50%;
    color: ${$.color.black};
    left: 0;
    width: 100%;
    height: 2px;
    background: #212121;
    animation: ${strikeAnimation} 4s ease-in-out 1 forwards;
  }
`;

export const smokyAnimation = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke;
  }
  to {
    transform:
      translate3d(15rem,-8rem,0)rotate(-40deg)skewX(70deg)scale(1.5);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

export const smokyMirrorAnimation = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke; }
  to {
    transform:
      translate3d(18rem,-8rem,0)rotate(-40deg)skewX(-70deg)scale(2);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

export const smoky = css`
  overflow: hidden;
  backface-visibility: hidden;
  & > span {
    display: inline-block;
    text-shadow: 0 0 0 whitesmoke;
    animation: ${smokyAnimation} 5s 3s both;
  }
  & > span:nth-child(even) {
    animation-name: ${smokyMirrorAnimation};
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translate3d(-150vw, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translate3d(150vw, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-150vw, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(150vw, 0, 0);
  }
`;

export const slide = {
  inleft: css`
    animation: 0.7s ${slideInLeft} ${$.easingFn.decelerate};
  `,
  inright: css`
    animation: 0.7s ${slideInRight} ${$.easingFn.decelerate};
  `,
  outleft: css`
    animation: 0.7s ${slideOutLeft} ${$.easingFn.accelerate};
  `,
  outright: css`
    animation: 0.7s ${slideOutRight} ${$.easingFn.accelerate};
  `
};

// Animations
export const checkboxOn = keyframes`
  0% {
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      15px 2px 0 11px;
  }
  50% {
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      20px 2px 0 11px;
  }
  100% {
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      20px -12px 0 11px;
  }
`;

export const checkboxOff = keyframes`
  0% {
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      20px -12px 0 11px,
      0 0 0 0 inset;
  }

  25% {
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      20px -12px 0 11px,
      0 0 0 0 inset;
  }
  50% {
    transform: rotate(45deg);
    margin-top: -4px;
    margin-left: 6px;
    width: 0;
    height: 0;
    box-shadow:
      0 0 0 10px,
      10px -10px 0 10px,
      32px 0 0 20px,
      0 32px 0 20px,
      -5px 5px 0 10px,
      15px 2px 0 11px,
      0 0 0 0 inset;
  }
  51% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: 20px;
    height: 20px;
    box-shadow:
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 10px inset;
  }
  100% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: 20px;
    height: 20px;
    box-shadow:
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0,
      0 0 0 0 inset;
  }
  `;
export const rippleOn = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(13,13);
  }
`;
export const rippleOff = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(13,13);
  }
`;
