import React from "react";
import styled from "styled-components";

import * as cons from "../../../../constants";
import { ReviewAspects } from "../../../../redux/slices/placeSlice";
import * as fs from "../../../../styles/styled-components/FontSize";

interface Props {
  avgReviewAspects: ReviewAspects;
}

const roundNumber = (num: number) => {
  const integer = Math.floor(num);
  const decimal = num - integer;

  return `${integer}.${Math.round(decimal * 10)}`;
};

const getScoreColor = (score: number) => {
  if (score > 4) return "#4aa1d5";
  if (score > 3) return "#42b589";
  if (score > 2) return "#edc233";
  if (score > 1) return "#eb7b7b";
  return cons.FONT_COLOR_LIGHTEST;
};

const ScoreBar = (props: { label: string; score: number | null }) => {
  if (!props.score) return null;

  return (
    <ScoreWrapper>
      <ScoreLabel>{props.label}</ScoreLabel>
      <ScoreBarWrapper>
        <ScoreBarInside
          score={props.score}
          color={getScoreColor(props.score)}
        />
      </ScoreBarWrapper>
      <ScoreBarValue>{roundNumber(props.score)}</ScoreBarValue>
    </ScoreWrapper>
  );
};

export const AvgReviewAspectsScore: React.FC<Props> = (props) => {
  if (!props.avgReviewAspects) return null;

  if (
    Object.values(props.avgReviewAspects).filter((v) => v !== null).length === 0
  ) {
    return null;
  }

  return (
    <AvgReviewAspectsScoreWrapper>
      <SectionLabel>Availability</SectionLabel>
      <ScoreBar label="Not Crowded 👨‍👨‍👧‍👦" score={props.avgReviewAspects.vacancy} />
      <ScoreBar
        label="Stable WiFi 🌐"
        score={props.avgReviewAspects.stableWifi}
      />

      <SectionLabel>Vibes</SectionLabel>
      <ScoreBar
        label="People Working 💻"
        score={props.avgReviewAspects.peopleWorking}
      />
      <ScoreBar label="Aesthetic 💅" score={props.avgReviewAspects.aesthetic} />
      <ScoreBar label="Community 🤝" score={props.avgReviewAspects.community} />

      <SectionLabel>Productivity</SectionLabel>
      <ScoreBar label="Quiet 🤫" score={props.avgReviewAspects.quiet} />
      <ScoreBar
        label="Air Condition 🌬"
        score={props.avgReviewAspects.airCondition}
      />
      <ScoreBar
        label="Comfy Chair 💺"
        score={props.avgReviewAspects.comfyChair}
      />
      <ScoreBar label="Wide Desk 👩‍💻" score={props.avgReviewAspects.wideDesk} />
    </AvgReviewAspectsScoreWrapper>
  );
};

const AvgReviewAspectsScoreWrapper = styled.div`
  max-width: 23rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const ScoreLabel = styled.div`
  width: 10rem;
  font-weight: 400;
  ${fs.FontSizeSemiSmall};
`;

const ScoreBarWrapper = styled.div`
  flex-grow: 1;
  height: 0.24rem;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  border-radius: 50px;
  overflow: hidden;
`;

const ScoreBarInside = styled.div<{ score: number; color: string }>`
  height: 100%;
  width: ${(props) => (props.score / 5) * 100}%;
  /* background-color: ${cons.FONT_COLOR_NORMAL}; */
  background-color: ${(props) => props.color};
  opacity: 0.9;
`;

const ScoreBarValue = styled.div`
  width: 3rem;
  text-align: right;
  ${fs.FontSizeSemiSmall};
  /* font-weight: 400; */
  /* color: ${cons.FONT_COLOR_SECONDARY}; */
`;

const SectionLabel = styled.div`
  color: ${cons.FONT_COLOR_LIGHTEST};
  ${fs.FontSizeSemiSmall};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 800;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;
