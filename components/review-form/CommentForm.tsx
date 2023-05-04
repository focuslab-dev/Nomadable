import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { ReviewStars } from "../app-commons/ReviewStars";
import { getStarValue } from "../place/components/review/ReviewScore";
import { FormStyle } from "../../styles/styled-components/Forms";
import {
  ButtonText,
  ButtonBlackSmall,
  ButtonPrimaryMedium,
  ButtonPrimarySmall,
} from "../../styles/styled-components/Buttons";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";

interface Props {
  reviewId: string;
  comment: string;
  updateComment: (comment: string) => void;
  onClickSubmit: () => void;
  onClickDelete: () => void;
  onClickBack: () => void;
}

export const CommentForm: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Body>
        {/* <StarSection>
          <ReviewStars stars={props.stars} onChange={props.updateStars} />
          <ReviewStarNumber>{getStarValue(props.stars)}</ReviewStarNumber>
        </StarSection> */}
        <CommentFormInput
          value={props.comment}
          onChange={(e: any) => props.updateComment(e.target.value)}
          placeholder="What do people should know about this place?"
        />
      </Body>
      <Buttons>
        <DeleteButton
          onClick={props.onClickDelete}
          visible={props.reviewId !== ""}
        >
          Delete
        </DeleteButton>
        <RightButtons>
          <BackButton onClick={props.onClickBack}>Back</BackButton>
          <SubmitButton onClick={props.onClickSubmit}>Submit</SubmitButton>
        </RightButtons>
      </Buttons>
    </Fragment>
  );
};

const StarSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const ReviewStarNumber = styled.div`
  font-weight: 600;
  ${fs.FontSizeLarge};
  margin-left: 0.8rem;
`;

const CommentFormInput = styled.textarea`
  ${FormStyle};
  height: 10rem;
`;

const Body = styled.div`
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Buttons = styled.div`
  ${ContainerStyleInside}
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const DeleteButton = styled.button<{ visible: boolean }>`
  ${ButtonText};

  visibility: hidden;
  pointer-events: none;

  ${(props) =>
    props.visible &&
    `
    visibility: visible;
    pointer-events: auto;
  `}
`;

const SubmitButton = styled.button`
  /* ${ButtonBlackSmall} */
  ${ButtonPrimarySmall}
  margin-left: 4rem;
`;

const RightButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.button`
  ${ButtonText};
`;
