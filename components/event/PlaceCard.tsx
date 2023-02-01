import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  placeId: string;
  pictures: string[];
  name: string;
  address: string;
}

export const PlaceCard: React.FC<Props> = ({
  placeId,
  pictures,
  name,
  address,
}) => {
  return (
    <Link href={`/place/${placeId}`}>
      <PlaceCardWrapper>
        <ImageSection>
          {pictures.slice(0, 3).map((picture) => (
            <Picture key={picture} src={picture} />
          ))}
        </ImageSection>
        <InfoSection>
          <Name>{name}</Name>
          <Address>{address}</Address>
        </InfoSection>
      </PlaceCardWrapper>
    </Link>
  );
};

const PlaceCardWrapper = styled.div`
  ${ClickableStyle}
  margin-top: 1rem;
  border: 1px solid #ddd;

  border-radius: 0.5rem;
  overflow: hidden;
  /* width: 26rem; */

  ${forMobile(`
    width: 100%;
  `)}
`;

const ImageSection = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Picture = styled.img`
  width: 100%;
  height: 6rem;
  object-fit: cover;

  ${forMobile(`
      width: 33.4%;
      height: 4.5rem;
  `)}
`;

const InfoSection = styled.div`
  border-top: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding: 0.8rem 0.8rem 1rem 0.8rem;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Name = styled.div`
  font-weight: bold;
`;

const Address = styled.div`
  /* word-wrap: wrap;
  word-break: break-all; */
  ${FontSizeSemiSmall}
  color :${cons.FONT_COLOR_LIGHT};
  font-weight: 400;
  margin-top: 0.4em;
`;
