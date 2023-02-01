import Link from "next/link";
import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { Place, PlaceHeader } from "../../../redux/slices/placeSlice";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { NetSpeedIndicator } from "../../commons/NetSpeedIndicator";
import { AnimationSlideUp } from "../../../styles/styled-components/Animations";
import { Bold } from "../../../styles/styled-components/Texts";
import { getStarValue } from "../../place/components/review/ReviewScore";
import { ButtonText } from "../../../styles/styled-components/Buttons";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuthenticated } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";

interface Props {
  place: PlaceHeader;
  selected: boolean | undefined;
  onClickSave: (event: any, placeId: string, saved: boolean) => void;
}

export const getCity = (address: string) => {
  const addressArr = address.split(",");
  const countryCityArr = addressArr.slice(
    addressArr.length - 2,
    addressArr.length
  );
  return countryCityArr.join(",");
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
          <ReviewStars>
            <StarIcon src="/icon/star-black.svg" />
            {getStarValue(place.reviewStars)}
            <Dot>&#x2022;</Dot>
          </ReviewStars>
        )}
        <CheckInCnt>
          <CheckInNum>{place.testCnt}</CheckInNum> chk-in
        </CheckInCnt>

        {renderDistance(place.distance)}
      </ScoreInfo>
    </PlaceItemWrapper>
  );
};

const PlaceItemWrapper = styled.div<{ selected: undefined | boolean }>`
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
  ${fs.FontSizeSemiSmall};
  font-weight: 400;
  margin-bottom: 0.4rem;
  /* font-weight: 600; */
`;

const ScoreInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
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

const ReviewStars = styled.div`
  ${fs.FontSizeSemiSmall};
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
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
