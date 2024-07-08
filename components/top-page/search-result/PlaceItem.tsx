import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import {
  PlaceHeader,
  ReviewSimpleType,
} from "../../../redux/slices/placeSlice";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { NetSpeedIndicator } from "../../commons/NetSpeedIndicator";
import { AnimationSlideUp } from "../../../styles/styled-components/Animations";
import { getStarValue } from "../../place/components/review/ReviewScore";

interface Props {
  place: PlaceHeader;
  selected: boolean | undefined;
  onClickSave: (event: any, placeId: string, saved: boolean) => void;
}

export const getCity = (address: string) => {
  const addressArr = address.split(",");
  const countryCityArr = addressArr.slice(
    addressArr.length - 3,
    addressArr.length
  );
  return countryCityArr.join(",").trim();
};
/**
 *  Render
 */

const renderDistance = (distance: number | undefined) => {
  if (!distance) return;

  const distanceInKm = Math.round(distance / 100) / 10;

  return (
    <Fragment>
      <Dot>&#x2022;</Dot>
      <Distance>
        <DistanceNum>{distanceInKm}</DistanceNum> km
      </Distance>
    </Fragment>
  );
};

export const PlaceItem: React.FC<Props> = ({
  place,
  selected,
  onClickSave,
}) => {
  return (
    <PlaceItemWrapper selected={selected}>
      <ImageWrapper>
        <Image
          className="place_image"
          src={place.thumbnail}
          alt="place image"
        />
        <SpeedWrapper>
          <NetSpeedIndicator speed={place.speedDown} bgWhite />
        </SpeedWrapper>
        <PlaceType>
          {cons.PLACE_TYPE_LIST[place.placeType].icon}
          {`  `}
          {place.placeType}
        </PlaceType>
        <SaveButton
          saved={place.savedByUser}
          onClick={(event) => onClickSave(event, place.id, !place.savedByUser)}
        >
          <SaveButtonIcon
            src={
              place.savedByUser ? "/icon/tag-green.svg" : "/icon/tag-black.svg"
            }
          />
        </SaveButton>
      </ImageWrapper>
      <Name>{place.spotName}</Name>
      <Address>{getCity(place.spotAddress)}</Address>
      <ScoreInfo>
        {place.reviewStars > 0 && (
          <ReviewStars isGold={place.reviewStars >= 4.5}>
            {place.reviewStars >= 4.5 ? (
              <StarIcon src="/icon/star-gold.svg" />
            ) : (
              <StarIcon src="/icon/star-black.svg" />
            )}
            {getStarValue(place.reviewStars)}
            <Dot>&#x2022;</Dot>
          </ReviewStars>
        )}
        <CheckInCnt>
          <CheckInNum>{place.testCnt}</CheckInNum> chk-in
        </CheckInCnt>

        {renderDistance(place.distance)}
      </ScoreInfo>
      <TopReview topReview={place.topReview} />
    </PlaceItemWrapper>
  );
};

const TopReview: React.FC<{ topReview: ReviewSimpleType }> = ({
  topReview,
}) => {
  if (!topReview || topReview.comment.length === 0) return null;

  return (
    <ReviewInfo>
      <UserPicture src={topReview.userPicture} />
      <Comment>{topReview.comment}</Comment>
    </ReviewInfo>
  );
};

const PlaceItemWrapper = styled.div<{ selected: undefined | boolean }>`
  overflow: hidden;
  ${ClickableStyle}
  position: relative;
  ${AnimationSlideUp}

  ${(props) =>
    props.selected === true &&
    `
    & .place_image {
      border: 3px solid ${cons.COLOR_RED_0};
      width: calc(100% - 6px);
      height: calc(100% - 6px);
    }
  `};

  margin-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  height: 15rem;
  position: relative;
`;

const SaveButton = styled.div<{ saved: boolean }>`
  ${ClickableStyle}
  opacity: 0.5;
  position: absolute;
  top: 1rem;
  right: 1rem;

  ${(props) =>
    props.saved &&
    `
    opacity: 1;
  `}
`;

const SaveButtonIcon = styled.img`
  width: 1.3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const SpeedWrapper = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
`;

const PlaceType = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  /* font-size: ${fs.FontSizeSmall}; */
  font-size: 0.9rem;
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
`;

const Name = styled.div`
  font-weight: 700;
  margin: 0.5rem 0 0.3rem 0;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Address = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSmall};
  font-weight: 400;
  margin-bottom: 0.4rem;
  /* font-weight: 600; */
  /* white-space: nowrap; */
`;

const ScoreInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CheckInCnt = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall};
  font-weight: 400;
`;

const CheckInNum = styled.span`
  /* color: ${cons.FONT_COLOR_NORMAL}; */
  font-weight: 700;
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

const Distance = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall};
  margin-left: 0.2rem;
`;

const DistanceNum = styled.span`
  font-weight: 700;
`;

export const LinkA = styled.a``;

const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${fs.FontSizeSmall};
`;

const UserPicture = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
  border-radius: 100%;
  flex-shrink: 0;
`;

const Comment = styled.div`
  white-space: nowrap;
  color: ${cons.FONT_COLOR_SECONDARY};
`;
