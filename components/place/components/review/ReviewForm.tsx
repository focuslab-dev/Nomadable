import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../../../constants";
import * as fs from "../../../../styles/styled-components/FontSize";

interface Props {
  onPostReview: (stars: number, comment: string) => void;
}

const STAR_BLACK_ICON = "/icon/star-black.svg";
const STAR_WHITE_ICON = "/icon/star-white.svg";

export const ReviewForm: React.FC<Props> = ({}) => {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [active, setActive] = useState(false);

  const onChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  const onFocus = () => {};

  const onBlur = () => {};

  return (
    <ReviewFormWrapper>
      <StarForm>
        <StarIcon src={stars >= 1 ? STAR_BLACK_ICON : STAR_WHITE_ICON} />
        <StarIcon src={stars >= 1 ? STAR_BLACK_ICON : STAR_WHITE_ICON} />
        <StarIcon src={stars >= 1 ? STAR_BLACK_ICON : STAR_WHITE_ICON} />
        <StarIcon src={stars >= 1 ? STAR_BLACK_ICON : STAR_WHITE_ICON} />
        <StarIcon src={stars >= 1 ? STAR_BLACK_ICON : STAR_WHITE_ICON} />
      </StarForm>

      <ReviewFormInput
        value={comment}
        onChange={onChangeComment}
        active={active}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </ReviewFormWrapper>
  );
};

const ReviewFormWrapper = styled.div``;

const ReviewFormInput = styled.textarea<{ active: boolean }>``;

const StarForm = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarIcon = styled.img`
  width: 1.5rem;
  opacity: 0.5;
`;
