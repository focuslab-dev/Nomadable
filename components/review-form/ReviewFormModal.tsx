import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiDeleteReview,
  apiPostReview,
  selectApiDeleteReviewStatus,
  selectApiPostReviewStatus,
} from "../../redux/slices/api/apiReviewSlice";
import {
  hideReviewModal,
  selectReviewFormState,
  updateReviewForm,
} from "../../redux/slices/reviewFormSlice";
import {
  ButtonBlackSmall,
  ButtonPrimarySmall,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { FormStyle } from "../../styles/styled-components/Forms";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { ReviewStars } from "../app-commons/ReviewStars";
import { Modal } from "../commons/Modal";
import { ModalHeader } from "../commons/ModalHeader";
import { PageLoader } from "../commons/PageLoader";

interface Props {}

const getStarValue = (stars: number): string => {
  const floatValue = Math.round(stars * 10) / 10;
  const valueStr = floatValue.toString();
  return `${valueStr}${valueStr.length === 1 && ".0"}`;
};

export const ReviewFormModal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { reviewId, visible, placeId, comment, stars } = useAppSelector(
    selectReviewFormState
  );
  const apiStatusDelete = useAppSelector(selectApiDeleteReviewStatus);
  const apiStatusPost = useAppSelector(selectApiPostReviewStatus);

  const closeModal = () => {
    dispatch(hideReviewModal());
  };

  const updateStars = (_stars: number) => {
    dispatch(updateReviewForm({ comment, stars: _stars }));
  };

  const updateComment = (_comment: string) => {
    dispatch(updateReviewForm({ comment: _comment, stars }));
  };

  const onClickSubmit = () => {
    dispatch(
      apiPostReview({
        placeId,
        stars,
        comment,
        isNew: reviewId === "",
      })
    );
  };

  const onClickDelete = () => {
    const response = window.confirm("Do you want to delete your review?");
    if (!response) return;

    dispatch(
      apiDeleteReview({
        placeId,
        reviewId,
      })
    );
  };

  return (
    <Modal visible={visible} width="32rem" closeModal={closeModal}>
      <ModalHeader onClickClose={closeModal} title={"Write Review"} />
      <Body>
        <StarSection>
          <ReviewStars stars={stars} onChange={updateStars} />
          <ReviewStarNumber>{getStarValue(stars)}</ReviewStarNumber>
        </StarSection>
        <CommentForm
          value={comment}
          onChange={(e: any) => updateComment(e.target.value)}
          placeholder="Is it a good place to work from?"
        />
      </Body>
      <Buttons>
        {reviewId !== "" && (
          <DeleteButton onClick={onClickDelete}>Delete</DeleteButton>
        )}
        <SubmitButton onClick={onClickSubmit} disabled={stars < 1}>
          Save
        </SubmitButton>
      </Buttons>

      <PageLoader
        visible={[apiStatusPost.status, apiStatusDelete.status].includes(
          cons.API_LOADING
        )}
        message={
          apiStatusPost.status === cons.API_LOADING
            ? "Saving..."
            : "Deleting..."
        }
      />
    </Modal>
  );
};

const Body = styled.div`
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: ${cons.FONT_COLOR_NORMAL};
`;

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

const CommentForm = styled.textarea`
  ${FormStyle};
  height: 10rem;
`;

const Buttons = styled.div`
  ${ContainerStyleInside}
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const DeleteButton = styled.button`
  ${ButtonText}
`;

const SubmitButton = styled.button`
  ${ButtonBlackSmall}
  margin-left: 4rem;
`;
