import { title } from "process";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { logEventGoogleLink } from "../../../modules/EventLogger";
import { forMobile } from "../../../styles/Responsive";
import { ButtonText } from "../../../styles/styled-components/Buttons";
import * as fs from "../../../styles/styled-components/FontSize";
import axios from "axios";
import { callFetchOpeningHours } from "../../../calls/spotCalls";

const getWeekLabel = (index: number) => {
  switch (index) {
    case 0:
      return "Mon";
    case 1:
      return "Tue";
    case 2:
      return "Wed";
    case 3:
      return "Thu";
    case 4:
      return "Fri";
    case 5:
      return "Sat";
    case 6:
      return "Sun";
  }
};

interface Props {
  googlePlaceId: string;
}

export const OpeningHours: React.FC<Props> = ({ googlePlaceId }) => {
  const [openingHours, setOpeningHours] = useState<string[]>([]);

  async function fetchOpeningHours() {
    const { data } = await callFetchOpeningHours(googlePlaceId);
    setOpeningHours(data.openHours);
  }

  useEffect(() => {
    fetchOpeningHours();
  }, [googlePlaceId]);

  return (
    <OpeningInfoWrapper>
      <Label>Opening Hours</Label>
      <Card>
        {openingHours.length === 0 && "No opening hours available"}
        {openingHours.map((hourText, index) => {
          const label = hourText.split(": ")[0];
          const value = hourText.split(": ")[1];

          return (
            <HourRow key={index}>
              <HourLabel>{label.slice(0, 3)}</HourLabel>
              <HourValue>{value}</HourValue>
            </HourRow>
          );
        })}
      </Card>
    </OpeningInfoWrapper>
  );
};

const OpeningInfoWrapper = styled.div`
  width: 100%;
  margin-top: 1.8rem;
`;

const Label = styled.div`
  ${fs.FontSizeNormal}
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 1.2rem;

  ${forMobile(`
    display:none;
 `)}
`;

const Card = styled.div`
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.4rem;
  padding: 1.5rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  ${fs.FontSizeSemiSmall}

  ${forMobile(`
    padding: 1rem;
 `)}
`;

const HourRow = styled.div`
  display: flex;
  font-weight: 400;
  color: ${cons.FONT_COLOR_NORMAL};
  color: ${cons.FONT_COLOR_LIGHT};
`;

const HourLabel = styled.div`
  width: 3rem;
  font-weight: 600;
  color: ${cons.FONT_COLOR_LIGHT};
  color: ${cons.FONT_COLOR_NORMAL};
`;

const HourValue = styled.div``;
