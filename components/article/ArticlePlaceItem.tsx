import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import { forMobile } from "../../styles/Responsive";
import * as fs from "../../styles/styled-components/FontSize";
import {
  Header2,
  Paragraph,
  ParagraphLarge,
} from "../../styles/styled-components/Texts";

interface Props {
  index: number;
  placeWithData: PlaceWithData;
}

export const ArticlePlaceItem: React.FC<Props> = ({ index, placeWithData }) => {
  const pl = placeWithData;

  return (
    <ArticlePlaceItemWrapper>
      <Link href={`/place/${pl.id}`} passHref>
        <a>
          <SpotName>
            {index + 1}. {pl.spotName}
          </SpotName>
        </a>
      </Link>
      <HeaderImage src={pl.images[0]} />
      <BodySection>
        <BasicInfo>
          <BodyLabel>Basic Information</BodyLabel>
          <BodyTextFlex>
            {pl.availability.map((av) => (
              <AvailabilityItem key={av}>
                <AvailabilityIcon>
                  {cons.AVL_ALL_LIST[av].icon}
                </AvailabilityIcon>
                {cons.AVL_ALL_LIST[av].text}
              </AvailabilityItem>
            ))}
          </BodyTextFlex>
        </BasicInfo>
        <InternetSpeed>
          <BodyLabel>Internet Speed</BodyLabel>
          <BodyTextFlex>
            <SpeedItem>&darr; {pl.speedDown}mbps</SpeedItem>
            <SpeedItem>&uarr; {pl.speedUp}mbps</SpeedItem>
          </BodyTextFlex>
        </InternetSpeed>
        <Review>
          <BodyLabel>
            {(pl.reviewsWithData.length > 0 &&
              `Review by ${pl.reviewsWithData[0].userName}`) ||
              "No reviews yet"}
          </BodyLabel>
          <BodyText>
            {pl.reviewsWithData.length > 0 && pl.reviewsWithData[0].comment}
          </BodyText>
        </Review>

        <OpenInGoogle>
          <GoogleLink
            href={`${cons.LOCATION_LINK_PLACE_ID}${pl.googlePlaceId}`}
            target="_blank"
            rel="noopener"
          >
            Open in Google Map
          </GoogleLink>
        </OpenInGoogle>
      </BodySection>
    </ArticlePlaceItemWrapper>
  );
};

const ArticlePlaceItemWrapper = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  padding-bottom: 2.5rem;
`;

const SpotName = styled.div`
  ${Header2}
  margin-bottom: 1.5rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  border-radius: 0.6rem;
  height: 18rem;
  object-fit: cover;

  ${forMobile(`
    height: 14rem;
  `)}
`;

const BodySection = styled.div``;

const BasicInfo = styled.div``;

const BodyLabel = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: 600;
  margin: 1.4rem 0 0.6rem 0;
  ${fs.FontSizeSemiSmall};
`;

const BodyText = styled.div`
  ${Paragraph}
`;

const AvailabilityItem = styled.div`
  display: flex;
  font-weight: 500;
`;

const AvailabilityIcon = styled.div`
  margin-right: 0.3rem;
`;

const InternetSpeed = styled.div`
  font-weight: 500;
`;
const Review = styled.div``;

const BodyTextFlex = styled.div`
  display: flex;
  gap: 1rem;
`;

const SpeedItem = styled.div``;

const OpenInGoogle = styled.div``;

const GoogleLink = styled.a`
  font-weight: 400;
  text-decoration: underline;
`;
