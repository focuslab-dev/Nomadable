import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  stars: number;
  onChange?: (stars: number) => void;
}

const ICON_BLACK_STAR = "/icon/star-black.svg";
const ICON_WHITE_STAR = "/icon/star-white.svg";

export const ReviewStars: React.FC<Props> = ({ stars, onChange }) => {
  return (
    <ReviewStarsWrapper interactive={onChange !== undefined}>
      <StarIcon
        src={stars >= 1 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        onClick={() => onChange && onChange(1)}
      />
      <StarIcon
        src={stars >= 2 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        onClick={() => onChange && onChange(2)}
      />
      <StarIcon
        src={stars >= 3 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        onClick={() => onChange && onChange(3)}
      />
      <StarIcon
        src={stars >= 4 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
        onClick={() => onChange && onChange(4)}
      />
      <StarIcon
        src={stars >= 5 ? ICON_BLACK_STAR : ICON_WHITE_STAR}
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

const StarIcon = styled.img`
  width: 1.2em;
`;
