import React from "react";
import styled, { css } from "styled-components";

export default function Loader({ color }: { color?: string }) {
  return <LoaderWrapper color={color || "#ffffff"} />;
}

const LoaderBeforeAfter = css`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.1s infinite ease-in-out;
  animation: load7 1.1s infinite ease-in-out;
`;

interface LoaderWrapperProps {
  color: string;
}

const LoaderWrapper = styled.div<LoaderWrapperProps>`
  color: ${(props) => props.color};
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.12s;
  animation-delay: -0.12s;

  font-size: 4px;
  margin: 0px auto;
  transform: translateY(-10px);

  ${LoaderBeforeAfter}
  &:before, &:after {
    ${LoaderBeforeAfter}
    content: '';
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3.5em;
    -webkit-animation-delay: -0.12s;
    animation-delay: -0.12s;
  }
  &:after {
    left: 3.5em;
    animation-delay: 0.12s;
  }
  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;
