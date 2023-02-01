import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { winddowAlert } from "../../../modules/ClientFunctions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { apiVoteReview } from "../../../redux/slices/api/apiReviewSlice";
import { Review, ReviewWithData } from "../../../redux/slices/placeSlice";
import {
  openEditReviewForm,
  openNewReviewForm,
} from "../../../redux/slices/reviewFormSlice";
import {
  selectAuthenticated,
  selectUser,
} from "../../../redux/slices/userSlice";
import {
  ButtonSecondarySmall,
  ButtonSecondarySmallest,
} from "../../../styles/styled-components/Buttons";
import { ReviewForm } from "./review/ReviewForm";
import { ReviewItem } from "./review/ReviewItem";
import { ReviewScore } from "./review/ReviewScore";

interface Props {
  reviewsWithData: ReviewWithData[];
  reviewStars: number;
  placeId: string;
}

export const Reviews: React.FC<Props> = ({
  reviewsWithData,
  reviewStars,
  placeId,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const userId = useAppSelector(selectUser)._id;

  const showNewReviewForm = () => {
    if (isAuthenticated) {
      dispatch(openNewReviewForm({ placeId }));
    } else {
      winddowAlert(cons.MSG_NOT_LOGIN);
    }
  };

  const onClickEdit = (reviewId: string, stars: number, comment: string) => {
    dispatch(openEditReviewForm({ reviewId, placeId, stars, comment }));
  };

  const onClickVote = (
    isUpvote: boolean,
    reviewId: string,
    clearVote: boolean
  ) => {
    dispatch(apiVoteReview({ reviewId, isUpvote, userId, clearVote }));
  };

  return (
    <ReviewsWrapper>
      {!reviewsWithData.map((r) => r.myReview).includes(true) && (
        <AddReviewButton onClick={showNewReviewForm}>
          + Add Review
        </AddReviewButton>
      )}
      <ReviewScoreSection>
        <ReviewScore stars={reviewStars} reviewCnt={reviewsWithData.length} />
      </ReviewScoreSection>
      {reviewsWithData.length > 0 && (
        <ReviewItems>
          {reviewsWithData.map((reviewWithData) => (
            <ReviewItem
              key={reviewWithData._id}
              reviewWithData={reviewWithData}
              onClickEdit={onClickEdit}
              userId={userId}
              onClickVote={onClickVote}
            />
          ))}
        </ReviewItems>
      )}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  position: relative;
  padding-top: 0.5rem;
`;

const ReviewScoreSection = styled.div`
  /* margin-top: 2rem; */
`;

const ReviewFormSection = styled.div``;

const ReviewItems = styled.div`
  margin-top: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const AddReviewButton = styled.button`
  ${ButtonSecondarySmallest};
  border-radius: 10rem;
  position: absolute;
  top: -3.55rem;
  left: 7rem;
`;
