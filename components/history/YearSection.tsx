import events from "events";
import Link from "next/link";
import { relative } from "path";
import React, { ReactNode, useMemo, useState } from "react";
import { text } from "stream/consumers";
import styled from "styled-components";

import * as cons from "../../constants";
import { toMonthDate } from "../../modules/DateUtils";
import { CheckInHistoryItem } from "../../redux/slices/checkInSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonText } from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { Header3 } from "../../styles/styled-components/Texts";
import { CircleAndBorder } from "./CircleAndBorder";
import { CountrySection } from "./CountrySection";

interface Props {
  checkInHistory: CheckInHistoryItem[];
  toggleId: string;
  toggleCheckIns: (id: string) => void;
}

export const YearSection: React.FC<Props> = ({
  checkInHistory,
  toggleId,
  toggleCheckIns,
}) => {
  const cutIntoCountries = (
    _checkInHistory: CheckInHistoryItem[]
  ): { country: string; checkIns: CheckInHistoryItem[] }[] => {
    const _countries: {
      country: string;
      checkIns: CheckInHistoryItem[];
    }[] = [];

    let prevCountry = "";
    _checkInHistory.forEach((ch) => {
      const country = ch.placeCountry;

      if (country !== prevCountry) {
        _countries.push({ country, checkIns: [] });
        prevCountry = country;
      }

      _countries[_countries.length - 1].checkIns.push(ch);
    });

    return _countries;
  };

  const countries = useMemo(
    () => cutIntoCountries(checkInHistory),
    [checkInHistory.length]
  );

  const getDuration = (checkIns: CheckInHistoryItem[]) => {
    const firstDate = new Date(checkIns[checkIns.length - 1].checkInTime);
    const lastDate = new Date(checkIns[0].checkInTime);
    const year = firstDate.getFullYear().toString();

    const firstDateStr = toMonthDate(firstDate);
    const lastDateStr = toMonthDate(lastDate);

    return `${year} ${firstDateStr} - ${lastDateStr} `;
  };

  return (
    <YearSectionWrapper>
      {countries.map(({ country, checkIns }, index) => {
        return (
          <CountryWrapper key={`${country}-${index}`}>
            <CircleAndBorder />
            <CountryLabel>
              {country}
              <CountrySummary>
                {getDuration(checkIns)}({checkIns.length})
              </CountrySummary>
            </CountryLabel>

            <CountrySection checkIns={checkIns} />
          </CountryWrapper>
        );
      })}
    </YearSectionWrapper>
  );
};

const YearSectionWrapper = styled.div``;

const CountryLabel = styled.div`
  ${Header3};
  margin: 0;
  margin-bottom: 2rem;
  /* display: flex; */
  /* align-items: flex-end; */
`;

export const CountrySummary = styled.span`
  ${fs.FontSizeSemiSmall}
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};
  margin-left: 0.8rem;
`;

const CountryWrapper = styled.div`
  margin-bottom: 2rem;
  padding-left: 1.8rem;
  position: relative;
  /* overflow: hidden; */
  /* transform: translateX(2rem); */
`;

export const HideTop = styled.div`
  position: absolute;
  top: -2rem;
  width: 100%;
  background-color: white;
  height: 2.5rem;

  /* background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  ); */
`;
