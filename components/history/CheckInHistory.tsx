import Link from "next/link";
import React, { Fragment, ReactNode, useMemo, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { toMonthDate } from "../../modules/DateUtils";
import { CheckInHistoryItem } from "../../redux/slices/checkInSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonText } from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import {
  Header1,
  Header2,
  Header3,
} from "../../styles/styled-components/Texts";
import { CircleAndBorder } from "./CircleAndBorder";
import { YearSection } from "./YearSection";

interface Props {
  checkInHistory: CheckInHistoryItem[];
}

export const CheckInHistory: React.FC<Props> = ({ checkInHistory }) => {
  const [toggleId, setToggleId] = useState("");

  const toggleCheckIns = (id: string) => {
    setToggleId(id);
  };

  /**
   * Render
   */

  const cutIntoYears = (
    _checkInHistory: CheckInHistoryItem[]
  ): { year: string; checkInHistory: CheckInHistoryItem[] }[] => {
    const _years: { year: string; checkInHistory: CheckInHistoryItem[] }[] = [];

    let prevYear = "";
    _checkInHistory.forEach((ch) => {
      const date = new Date(ch.checkInTime);
      const yearLabel = date.getFullYear().toString();

      if (yearLabel !== prevYear) {
        _years.push({ year: yearLabel, checkInHistory: [] });
        prevYear = yearLabel;
      }

      _years[_years.length - 1].checkInHistory.push(ch);
    });

    return _years;
  };

  const years = cutIntoYears(checkInHistory);

  return (
    <Wrapper>
      {years.map(({ year, checkInHistory }) => (
        <YearSectionWrapper key={year}>
          <YearLabel>{year}</YearLabel>
          <YearSection
            checkInHistory={checkInHistory}
            toggleCheckIns={toggleCheckIns}
            toggleId={toggleId}
          />
        </YearSectionWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const YearSectionWrapper = styled.div``;

const YearLabel = styled.div`
  ${Header2};
  margin: 0;
  /* margin-bottom: 1rem; */
  position: relative;
  /* background-color: white; */
  z-index: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;

  /* position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 10%,
    rgba(255, 255, 255, 1) 90%,
    rgba(255, 255, 255, 0) 100%
  ); */

  ${forMobile(`
    margin: 0;
`)}
`;
