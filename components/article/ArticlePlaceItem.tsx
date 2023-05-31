import Link from "next/link";
import React, { Fragment } from "react";
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
import { getStarValue } from "../place/components/review/ReviewScore";
import {
  ButtonRedMedium,
  SizeSmall,
} from "../../styles/styled-components/Buttons";
import { ButtonText } from "../../styles/styled-components/Buttons";

interface Props {
  index: number;
  placeWithData: PlaceWithData;
}

export const ArticlePlaceItem: React.FC<Props> = ({ index, placeWithData }) => {
  const pl = placeWithData;

  return (
    <ArticlePlaceItemWrapper>
      {/* <Link href={`/place/${pl.id}`} passHref> */}
      {/* <a> */}
      <SpotName>
        {index + 1}. {pl.spotName}
      </SpotName>
      {/* </a> */}
      {/* </Link> */}

      <TypeInformation>
        <PlaceType>
          {cons.getPlaceTypeString(placeWithData.placeType)}
        </PlaceType>
        {placeWithData.reviewStars > 0 && (
          <Fragment>
            <Dot>&#x2022;</Dot>
            <ReviewStars isGold={placeWithData.reviewStars >= 4.5}>
              {placeWithData.reviewStars >= 4.5 ? (
                <StarIcon src="/icon/star-gold.svg" />
              ) : (
                <StarIcon src="/icon/star-black.svg" />
              )}
              {getStarValue(placeWithData.reviewStars)}
            </ReviewStars>
          </Fragment>
        )}
      </TypeInformation>
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

        {pl.reviewsWithData.length > 0 &&
          pl.reviewsWithData[0].comment.length > 0 && (
            <Review>
              <BodyLabel>Review by {pl.reviewsWithData[0].userName}</BodyLabel>
              <BodyText>
                {pl.reviewsWithData.length > 0 && pl.reviewsWithData[0].comment}
              </BodyText>
            </Review>
          )}

        <OpenInGoogle>
          <BodyLabel>Location</BodyLabel>
          {/* <SpotAddress>{pl.spotAddress}</SpotAddress> */}
          <GoogleLink
            href={`${cons.LOCATION_LINK_PLACE_ID}${pl.googlePlaceId}`}
            target="_blank"
            rel="noopener"
          >
            {pl.spotAddress}
          </GoogleLink>
        </OpenInGoogle>

        <MoreInfo>
          <Link href={`/place/${pl.id}`} passHref>
            <a target="_blank" rel="noopener noreferer">
              <MoreInfoButton>More Info</MoreInfoButton>
            </a>
          </Link>
        </MoreInfo>
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
  font-size: 1.5rem;
  /* margin-bottom: 1rem; */
  /* text-decoration: underline; */
  margin-bottom: 1rem;
  display: inline-block;
  margin-top: 0.5rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  border-radius: 0.6rem;
  height: 18rem;
  object-fit: cover;

  box-shadow: ${cons.SHADOW_3};
  ${forMobile(`
    height: 14rem;
  `)};
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
  /* color: ${cons.FONT_COLOR_LIGHT}; */
  /* ${fs.FontSizeSemiSmall}; */
`;

const TypeInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1.2rem;
`;

const PlaceType = styled.div`
  font-weight: 500;
  ${fs.FontSizeSemiSmall};
`;

const ReviewStars = styled.div<{ isGold: boolean }>`
  ${fs.FontSizeSemiSmall};
  font-weight: 700;

  display: flex;
  align-items: center;
  margin-right: 0.2rem;
  color: ${cons.FONT_COLOR_NORMAL};

  ${(props) =>
    !props.isGold &&
    `
  `}

  ${(props) =>
    props.isGold &&
    `
   color: "#dc9b39";
  `}
`;

const StarIcon = styled.img`
  width: 0.75rem;
  margin-right: 0.15rem;
`;

const Dot = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  margin-left: 0.2rem;
`;

const MoreInfo = styled.div`
  margin-top: 1.5rem;
`;
// const ButtonRedMedium = styled.div``;

const MoreInfoButton = styled.button`
  /* ${ButtonRedMedium}
  height: 2.7rem; */

  ${ButtonText}
  padding:0;
  color: ${cons.COLOR_RED_0};
  ${fs.FontSizeNormal}
`;

const SpotAddress = styled.div`
  font-weight: 400;
  ${fs.FontSizeSemiSmall};
`;
