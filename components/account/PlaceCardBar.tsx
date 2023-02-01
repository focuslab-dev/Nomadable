import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import {
  FontSizeSemiSmall,
  FontSizeSmall,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  placeId: string;
  pictures: string[];
  name: string;
  address: string;
}

export const PlaceCardBar: React.FC<Props> = ({
  placeId,
  pictures,
  name,
  address,
}) => {
  return (
    <Link href={`/place/${placeId}`} passHref>
      <a target="_blank" rel="noopener">
        <PlaceCardWrapper>
          <ImageSection>
            {pictures.slice(0, 1).map((picture) => (
              <Picture key={picture} src={picture} />
            ))}
          </ImageSection>
          <InfoSection>
            <Name>{name}</Name>
            <Address>{address}</Address>
          </InfoSection>
        </PlaceCardWrapper>
      </a>
    </Link>
  );
};

const PlaceCardWrapper = styled.div`
  ${ClickableStyle}
  margin-top: 1rem;
  border: 1px solid #ddd;

  border-radius: 0.5rem;
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  height: 7rem;

  ${forMobile(`
    width: 100%;
    height: 6rem;
  `)}
`;

const ImageSection = styled.div`
  display: flex;
  gap: 0.2rem;
  height: 100%;

  ${forMobile(`
    height: 100%;
  `)}
`;

const Picture = styled.img`
  object-fit: cover;
  width: 8rem;
  height: 100%;

  ${forMobile(`
      width: 7rem;
      height: 100%;
  `)}
`;

const InfoSection = styled.div`
  padding: 0.9rem 0.8rem 1rem 1.2rem;
  color: ${cons.FONT_COLOR_NORMAL};
  width: 100%;

  ${forMobile(`
    padding: 0.7rem 0.8rem 1rem 1.2rem;
  `)}
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

  ${forMobile(`
    ${FontSizeSmall}
  `)}
`;
