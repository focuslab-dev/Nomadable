import React, { Fragment, useEffect, useState } from "react";
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
  updateReviewAspects,
  updateReviewForm,
} from "../../redux/slices/reviewFormSlice";
import { Modal } from "../commons/Modal";
import { ModalHeader } from "../commons/ModalHeader";
import { PageLoader } from "../commons/PageLoader";
import { CommentForm } from "./CommentForm";
import { ReviewForm } from "./ReviewForm";
import { ReviewAspects } from "../../redux/slices/placeSlice";

interface Props {}

const getStarValue = (stars: number): string => {
  const floatValue = Math.round(stars * 10) / 10;
  const valueStr = floatValue.toString();
  return `${valueStr}${valueStr.length === 1 && ".0"}`;
};

export const ReviewFormModal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { reviewId, visible, placeId, comment, stars, reviewAspects } =
    useAppSelector(selectReviewFormState);
  const apiStatusDelete = useAppSelector(selectApiDeleteReviewStatus);
  const apiStatusPost = useAppSelector(selectApiPostReviewStatus);
  // local state
  const [pageIndex, setPageIndex] = useState(0);

  const closeModal = () => {
    dispatch(hideReviewModal());
  };

  const updateStars = (_stars: number) => {
    dispatch(updateReviewForm({ comment, stars: _stars }));
  };

  const updateComment = (_comment: string) => {
    dispatch(updateReviewForm({ comment: _comment, stars }));
  };

  const handleUpdateReviewAspects = (reviewAspects: ReviewAspects) => {
    dispatch(updateReviewAspects(reviewAspects));
  };

  const onClickNext = () => {
    setPageIndex(1);
  };

  const onClickBack = () => {
    setPageIndex(0);
  };

  const onClickSubmit = () => {
    dispatch(
      apiPostReview({
        reviewData: {
          placeId,
          comment,
          reviewAspects,
        },
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

  useEffect(() => {
    if (visible) {
      setPageIndex(0);
    }
  }, [visible]);

  /**
   * Render
   */

  return (
    <Modal visible={visible} width="32rem" closeModal={closeModal} alignTop>
      <ModalHeader
        onClickClose={closeModal}
        title={`Write Review (${pageIndex + 1})`}
      />

      {pageIndex === 0 && (
        <ReviewForm
          reviewId={reviewId}
          reviewAspects={reviewAspects}
          updateReviewAspects={handleUpdateReviewAspects}
          onClickNext={onClickNext}
          onClickDelete={onClickDelete}
        />
      )}
      {pageIndex === 1 && (
        <CommentForm
          reviewId={reviewId}
          comment={comment}
          updateComment={updateComment}
          onClickSubmit={onClickSubmit}
          onClickDelete={onClickDelete}
          onClickBack={onClickBack}
        />
      )}

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
