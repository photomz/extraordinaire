import { css, keyframes } from 'styled-components';
import $ from './global';

const strikeAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const strike = css`
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

const smokyAnimation = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke;
  }
  to {
    transform:
      translate3d(15rem,-8rem,0)
      rotate(-40deg)
      skewX(70deg)
      scale(1.5);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

const smokyMirrorAnimation = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke; }
  to {
    transform:
      translate3d(18rem,-8rem,0)
      rotate(-40deg)
      skewX(-70deg)
      scale(2);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

const smoky = css`
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

const slide = {
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

export default { strike, smoky };
export { slide };
