import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { ReviewStars } from "../app-commons/ReviewStars";
import { getStarValue } from "../place/components/review/ReviewScore";
import { FormStyle } from "../../styles/styled-components/Forms";
import { ReviewAspects } from "../../redux/slices/placeSlice";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../styles/styled-components/Buttons";

interface Props {
  reviewId: string;
  reviewAspects: any;
  updateReviewAspects: (reviewAspects: ReviewAspects) => void;
  onClickNext: () => void;
  onClickDelete: () => void;
}

export const ReviewForm: React.FC<Props> = (props) => {
  const handleUpdateReviewAspects = (key: string, number: number) => {
    const _number = number === props.reviewAspects[key] ? null : number;

    props.updateReviewAspects({
      ...props.reviewAspects,
      [key]: _number,
    });
  };

  /**
   *  Render
   */

  const StarItem = (props: {
    title: string;
    leftText: string;
    rightText: string;
    value: number | null;
    onChange: (number: number) => void;
  }) => {
    return (
      <StarSection>
        <SectionTitle>{props.title}</SectionTitle>
        <SectionDescription>
          {props.leftText} {`<->`} {props.rightText}
        </SectionDescription>
        <ReviewStars stars={props.value} onChange={props.onChange} />
      </StarSection>
    );
  };

  return (
    <Fragment>
      <Body>
        <SectionLabel>Availability</SectionLabel>
        <StarItem
          title="Not Crowded 👨‍👨‍👧‍👦"
          leftText="Packed with people"
          rightText="Many available seats"
          value={props.reviewAspects.vacancy}
          onChange={(number) => {
            handleUpdateReviewAspects("vacancy", number);
          }}
        />

        <StarItem
          title="Stable WiFi 🌐"
          leftText="Not usable"
          rightText="Stable all the time"
          value={props.reviewAspects.stableWifi}
          onChange={(number) => {
            handleUpdateReviewAspects("stableWifi", number);
          }}
        />

        <SectionLabel>Vibes</SectionLabel>

        <StarItem
          title="People Working 💻"
          leftText="None working"
          rightText="Majority working"
          value={props.reviewAspects.peopleWorking}
          onChange={(number) => {
            handleUpdateReviewAspects("peopleWorking", number);
          }}
        />

        <StarItem
          title="Aesthetic 💅"
          leftText="Not impressive"
          rightText="Stylish & motivating"
          value={props.reviewAspects.aesthetic}
          onChange={(number) => {
            handleUpdateReviewAspects("aesthetic", number);
          }}
        />

        <StarItem
          title="Community 🤝"
          leftText="Not cool"
          rightText="Friendly & welcoming"
          value={props.reviewAspects.community}
          onChange={(number) => {
            handleUpdateReviewAspects("community", number);
          }}
        />

        <SectionLabel>Productivity</SectionLabel>

        <StarItem
          title="Quiet 🤫"
          leftText="Too noisy"
          rightText="Quiet or bearable"
          value={props.reviewAspects.quiet}
          onChange={(number) => {
            handleUpdateReviewAspects("quiet", number);
          }}
        />

        <StarItem
          title="Air Condition 🌬"
          leftText="Unpleasant air"
          rightText="Good temparature"
          value={props.reviewAspects.airCondition}
          onChange={(number) => {
            handleUpdateReviewAspects("airCondition", number);
          }}
        />

        <StarItem
          title="Comfy Chair 💺"
          leftText="Causing body pain"
          rightText="Can sit for hours"
          value={props.reviewAspects.comfyChair}
          onChange={(number) => {
            handleUpdateReviewAspects("comfyChair", number);
          }}
        />

        <StarItem
          title="Wide Desk 👩‍💻"
          leftText="Laptop barely fits"
          rightText="More than enough space"
          value={props.reviewAspects.wideDesk}
          onChange={(number) => {
            handleUpdateReviewAspects("wideDesk", number);
          }}
        />

        <SectionLabel>Others</SectionLabel>

        <StarItem
          title="Overall 👍"
          leftText="Never coming back"
          rightText="My go-to place"
          value={props.reviewAspects.overall}
          onChange={(number) => {
            handleUpdateReviewAspects("overall", number);
          }}
        />
      </Body>
      <Buttons>
        <LeftButtonWrapper>
          {props.reviewId !== "" && (
            <DeleteButton onClick={props.onClickDelete}>Delete</DeleteButton>
          )}
        </LeftButtonWrapper>

        <SubmitButton onClick={props.onClickNext}>Next</SubmitButton>
      </Buttons>
    </Fragment>
  );
};

const StarSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
  /* display: flex; */
  /* align-items: center; */
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

const SectionTitle = styled.div`
  ${fs.FontSizeSemiLarge};
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const SectionDescription = styled.div`
  margin-bottom: 0.5rem;
  ${fs.FontSizeNormal};
  font-weight: 300;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const SectionLabel = styled.div`
  color: ${cons.FONT_COLOR_LIGHTEST};
  ${fs.FontSizeSemiSmall};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 800;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const DeleteButton = styled.button`
  ${ButtonText};
`;

const SubmitButton = styled.button`
  ${ButtonBlackSmall}
  margin-left: 4rem;
`;

const LeftButtonWrapper = styled.div``;
