import React from "react";
import styled from "styled-components";
import { Review } from "../../../../redux/slices/placeSlice";

import * as cons from "../../../../constants";
import * as fs from "../../../../styles/styled-components/FontSize";
import { ReviewStars } from "../../../app-commons/ReviewStars";

interface Props {
  stars: number;
  reviewCnt: number;
}

export const getStarValue = (stars: number): string => {
  const _stars = stars || 0;
  const floatValue = Math.round(_stars * 10) / 10;
  const valueStr = floatValue.toString();
  return `${valueStr}${valueStr.length === 1 && ".0"}`;
};

export const ReviewScore: React.FC<Props> = ({ stars, reviewCnt }) => {
  return (
    <ReviewScoreWrapper>
      <StarIcon src="/icon/star-black.svg" />
      <ReviewStarValue>{getStarValue(stars)}</ReviewStarValue>
      <ReviewCnt>({reviewCnt} reveiws)</ReviewCnt>
    </ReviewScoreWrapper>
  );
};

const ReviewScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const StarIcon = styled.img`
  width: 1rem;
`;

const ReviewStarValue = styled.div`
  margin-left: 0.5rem;
  ${fs.FontSizeLarge}
  font-weight: 600;
`;

const ReviewCnt = styled.div`
  margin-left: 0.6rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeNormal}
`;
