import Link from "next/link";
import React, { Fragment, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { toMonthDate } from "../../modules/DateUtils";
import { CheckInHistoryItem } from "../../redux/slices/checkInSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonText } from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  checkIns: CheckInHistoryItem[];
}

export const CountrySection: React.FC<Props> = ({ checkIns }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <CountrySectionWrapper>
      <CheckInItems showAll={showAll}>
        {checkIns.map((ch) => {
          return (
            <CheckInItem key={ch._id}>
              <Link href={`/place/${ch.placeId}`} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <CheckInImage src={ch.placeImage} />
                  <CheckInPlaceName>{ch.placeName}</CheckInPlaceName>
                  <CheckInDate>
                    {toMonthDate(new Date(ch.checkInTime))}
                  </CheckInDate>
                </a>
              </Link>
            </CheckInItem>
          );
        })}
      </CheckInItems>
      <OverlayWhite showAll={showAll} />
      <ToggleButton onClick={() => setShowAll(!showAll)}>
        {showAll ? "Hide" : "Show All"}
      </ToggleButton>
    </CountrySectionWrapper>
  );
};

export const CountrySectionWrapper = styled.div`
  position: relative;
`;

const CheckInItems = styled.div<{ showAll: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;

  max-height: 10rem;
  overflow: hidden;

  ${(props) =>
    props.showAll &&
    `
    max-height: 100%;
  `}

  ${forMobile(`
    gap: 0.5rem;
`)}
`;

const CheckInItem = styled.div`
  width: calc(20% - 0.8rem);
  ${ClickableStyle}

  ${forMobile(`
    width: calc(33% - 0.5rem);
`)}
`;

const CheckInImage = styled.img`
  width: 100%;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const CheckInPlaceName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  ${fs.FontSizeSemiSmall}
  color: ${cons.FONT_COLOR_NORMAL};
`;

const CheckInDate = styled.div`
  ${fs.FontSizeSmall};
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const OverlayWhite = styled.div<{ showAll: boolean }>`
  position: absolute;
  top: -2rem;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  ${(props) =>
    !props.showAll &&
    `
    background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 90%,
    rgba(255, 255, 255, 1) 100%
  );
  `}
`;

const ToggleButton = styled.button`
  ${ButtonText};
  padding: 0;
  margin-top: 1rem;
  text-decoration: underline;
`;
