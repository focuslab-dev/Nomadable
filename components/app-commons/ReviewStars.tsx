import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  stars: number | null;
  onChange?: (stars: number) => void;
}

const ICON_BLACK_STAR = "/icon/star-black.svg";
const ICON_WHITE_STAR = "/icon/star-white.svg";

export const ReviewStars: React.FC<Props> = ({ stars, onChange }) => {
  return (
    <ReviewStarsWrapper interactive={onChange !== undefined}>
      <StarIcon
        src={stars && stars >= 0.5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        active={typeof stars === "number" && stars >= 0.5}
        onClick={() => onChange && onChange(1)}
      />
      <StarIcon
        src={stars && stars >= 1.5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        active={typeof stars === "number" && stars >= 1.5}
        onClick={() => onChange && onChange(2)}
      />
      <StarIcon
        src={stars && stars >= 2.5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        active={typeof stars === "number" && stars >= 2.5}
        onClick={() => onChange && onChange(3)}
      />
      <StarIcon
        src={stars && stars >= 3.5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        active={typeof stars === "number" && stars >= 3.5}
        onClick={() => onChange && onChange(4)}
      />
      <StarIcon
        src={stars && stars >= 4.5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        active={typeof stars === "number" && stars >= 4.5}
        onClick={() => onChange && onChange(5)}
      />
    </ReviewStarsWrapper>
  );
};

const ReviewStarsWrapper = styled.div<{ interactive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.3em;

  ${(props) =>
    props.interactive &&
    `
    & img {
        ${ClickableStyle}
    }
  `};
`;

const StarIcon = styled.img<{ active: boolean }>`
  width: 1.2em;
  opacity: 0.4;

  ${(props) =>
    props.active &&
    `
    opacity: 1;
  `}
`;
