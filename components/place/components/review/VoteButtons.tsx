import React from "react";
import styled from "styled-components";

import * as cons from "../../../../constants";
import * as fs from "../../../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../../../styles/styled-components/Interactions";

interface Props {
  userId: string;
  upVoters: string[];
  downVoters: string[];
  onClickVote: (isUpvote: boolean, clearVote: boolean) => void;
}

export const VoteButtons: React.FC<Props> = (props) => {
  const onClickUpvote = () => {
    props.onClickVote(
      true,
      props.upVoters && props.upVoters.includes(props.userId)
    );
  };

  const onClickDownvote = () => {
    props.onClickVote(
      false,
      props.downVoters && props.downVoters.includes(props.userId)
    );
  };

  return (
    <VoteButtonsWrapper>
      <UpvoteButton onClick={onClickUpvote}>
        <UpvoteIcon
          src={
            props.upVoters && props.upVoters.includes(props.userId)
              ? "/icon/up-arrow-blue.svg"
              : "/icon/up-arrow-gray.svg"
          }
        />
        <VoteScore>
          {props.upVoters && props.downVoters
            ? props.upVoters.length - props.downVoters.length
            : 0}
        </VoteScore>
      </UpvoteButton>
      <DownvoteButton onClick={onClickDownvote}>
        <DownvoteIcon
          src={
            props.downVoters && props.downVoters.includes(props.userId)
              ? "/icon/up-arrow-blue.svg"
              : "/icon/up-arrow-gray.svg"
          }
        />
      </DownvoteButton>
    </VoteButtonsWrapper>
  );
};

const VoteButtonsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgb(0 0 0 / 14%);
  /* background-color: rgb(0 0 0 / 5%); */
  border-radius: 0.4rem;
  border-radius: 10rem;
  padding: 0.5rem 0.8rem;
`;

const VoteButton = styled.div`
  ${ClickableStyle}
  display: flex;
  align-items: center;
`;

const VoteIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

const UpvoteButton = styled(VoteButton)``;

const UpvoteIcon = styled(VoteIcon)``;

const VoteScore = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  margin-left: 0.2rem;
  padding-right: 0.6rem;
  font-weight: 400;
  border-right: 1px solid rgb(204 204 204);
`;

const DownvoteButton = styled(VoteButton)`
  margin-left: 0.5rem;
`;

const DownvoteIcon = styled(VoteIcon)`
  transform: rotate(180deg);
`;
