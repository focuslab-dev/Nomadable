import { css } from "styled-components";

export const KeyFrames = css`
  @keyframes slideup {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0rem);
    }
  }

  @keyframes slideleft {
    0% {
      opacity: 0;
      transform: translateX(1rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0rem);
    }
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blinking {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.4;
    }
  }
`;

export const CubicBezier = "cubic-bezier(0, 0.93, 0.59, 0.87)";

export const AnimationFadeIn = css`
  animation: fadein 0.4s ${CubicBezier};
`;

export const AnimationSlideUp = css`
  animation: slideup 0.4s ${CubicBezier};
`;

export const AnimationSlideLeft = css`
  animation: slideleft 0.4s ${CubicBezier};
`;

export const AnimationBlink = css`
  animation: blinking 1s ease-in infinite;
`;
