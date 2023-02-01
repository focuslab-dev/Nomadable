import React, { Fragment, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import { DiscoveredBy } from "./components/DiscoveredBy";
import { LocationInfo } from "./components/LocationInfo";
import { Reviews } from "./components/Reviews";
import { SpotImages } from "./components/SpotImages";
import { InternetSpeed } from "./components/InternetSpeed";
import { Availability } from "./components/Availability";
import { CheckInModal } from "./check-in-modal/CheckInModal";
import { SectionLoader } from "../commons/SectionLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiChangeStatusOfPlace,
  apiCheckIn,
  apiDeletePlace,
  apiSavePlace,
  apiUpdateImages,
  initApiDeletePlaceState,
  initapiFetchPlaceForPageState,
  selectApiCheckInStatus,
  selectApiDeletePlaceStatus,
  selectApiFetchPlaceForPageStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import { selectAuthenticated, selectUser } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import { apiPostReview } from "../../redux/slices/api/apiReviewSlice";
import { getStarValue } from "./components/review/ReviewScore";
import {
  ButtonSecondaryMedium,
  ButtonSecondarySmall,
  ButtonSecondarySmallest,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import Router, { useRouter } from "next/router";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { Selection } from "../commons/Selection";
import router from "next/router";

interface Props {
  placeWithData: PlaceWithData;
}

export const PlacePage: React.FC<Props> = ({ placeWithData }) => {
  const router = useRouter();
  const pd = placeWithData;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authenticated = useAppSelector(selectAuthenticated);

  const apiStatusCheckIn = useAppSelector(selectApiCheckInStatus);
  const apiStatusDelete = useAppSelector(selectApiDeletePlaceStatus);
  const apiStatusFetchPlace = useAppSelector(selectApiFetchPlaceForPageStatus);
  const isAuthenticated = useAppSelector(selectAuthenticated);

  const [checkInModalVisible, setCheckInModalVisible] = useState(false);

  /**
   * User Interface
   */

  const onClickSpeedTest = () => {
    if (!isAuthenticated) {
      window.alert("Please login to use the check-in feature.");
      return;
    }

    setCheckInModalVisible(true);
  };

  const closeCheckInModal = () => {
    setCheckInModalVisible(false);
  };

  const onCheckIn = (speedDown: number, speedUp: number, isPublic: boolean) => {
    // check in
    setCheckInModalVisible(false);
    dispatch(
      apiCheckIn({ placeId: placeWithData.id, speedDown, speedUp, isPublic })
    );
  };

  const updateImages = () => {
    dispatch(apiUpdateImages({ placeId: pd.id }));
  };

  const deletePlace = () => {
    // check if user really want to delete the place and then delete
    if (window.confirm(`Are you sure you want to delete "${pd.spotName}"?`)) {
      dispatch(apiDeletePlace({ placeId: pd.id }));
    }
  };

  const handleClickSave = () => {
    if (authenticated) {
      dispatch(apiSavePlace({ placeId: pd.id, saved: !pd.savedByUser }));
    } else {
      if (
        window.confirm(
          "You need to login to use the save feature. Do you want to signup?"
        )
      ) {
        router.push(cons.PATH_SIGNUP);
      }
    }
  };

  const onChangeStatus = (status: string) => {
    console.log(status);
    dispatch(apiChangeStatusOfPlace({ placeId: pd.id, status: status }));
  };

  const oneClickCheckIn = () => {
    if (
      router.query &&
      authenticated &&
      router.query.placeId === pd.id &&
      apiStatusFetchPlace.status === cons.API_SUCCEEDED &&
      router.query.checkin === "true"
    ) {
      if (pd.checkedInByUser === false) {
        setCheckInModalVisible(true);
      } else {
        window.alert("You already have checked in this place.");
      }
    }
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (apiStatusDelete.status === cons.API_SUCCEEDED) {
      dispatch(initApiDeletePlaceState());
      router.push("/");
    }
  }, [apiStatusDelete]);

  useEffect(() => {
    oneClickCheckIn();
  }, [apiStatusFetchPlace.status]);

  useEffect(() => {
    return () => {
      dispatch(initapiFetchPlaceForPageState());
    };
  }, [null]);

  /**
   * Render
   */

  const InfoItemWrapper = ({
    label,
    children,
  }: {
    label: string;
    children: ReactNode;
  }) => {
    return (
      <InfoItem>
        <InfoLabel>{label}</InfoLabel>
        {children}
      </InfoItem>
    );
  };

  return (
    <PlacePageWrapper>
      <SpotName>{pd.spotName}</SpotName>
      <ReviewInfo>
        <ReviewLeftSection>
          <PlaceType>
            {cons.PLACE_TYPE_LIST[pd.placeType].icon}
            {` `}
            {cons.PLACE_TYPE_LIST[pd.placeType].text}
          </PlaceType>
          {pd.reviewStars > 0 && (
            <Fragment>
              <Dot>&#x2022;</Dot>
              <ReviewStars>
                <StarIcon src="/icon/star-black.svg" />
                {getStarValue(pd.reviewStars)}
                <ReviewCnt>({pd.reviewsWithData.length})</ReviewCnt>
              </ReviewStars>
            </Fragment>
          )}
          {[cons.STATUS_TEMP_CLOSE, cons.STATUS_PERM_CLOSE].includes(
            pd.status
          ) && (
            <Fragment>
              <Dot>&#x2022;</Dot>
              <StatusWrapper>
                <Status>{cons.STATUS_LIST[pd.status].text}</Status>
              </StatusWrapper>
            </Fragment>
          )}
        </ReviewLeftSection>
        <ReviewRightSection>
          <SaveButton saved={pd.savedByUser} onClick={handleClickSave}>
            <SaveButtonIcon
              src={
                pd.savedByUser
                  ? "/icon/save-black.svg"
                  : "/icon/save-skeleton.svg"
              }
            />{" "}
            {pd.savedByUser ? "Saved" : "Save"}
          </SaveButton>
        </ReviewRightSection>
      </ReviewInfo>
      <ImageWrapper>
        <SpotImages images={pd.images} />
        {user.admin && (
          <UpdateImageButton onClick={updateImages}>
            Update Images
          </UpdateImageButton>
        )}
      </ImageWrapper>

      <InfoWrapper>
        <RightSection>
          <LocationInfo
            googlePlaceId={pd.googlePlaceId}
            spotAddress={pd.spotAddress}
          />
        </RightSection>
        <LeftSection>
          <InfoItemWrapper label="Internet Speed">
            <InternetSpeed
              speedUp={pd.speedUp}
              speedDown={pd.speedDown}
              testCnt={pd.recentCheckInCnt}
              checkedInByUser={pd.checkedInByUser}
              onClickSpeedTest={onClickSpeedTest}
              loading={apiStatusCheckIn.status === cons.API_LOADING}
              checkInUsers={pd.checkInUsers}
            />
          </InfoItemWrapper>
          <InfoItemWrapper label="Basic Info">
            <Availability
              placeId={pd.id}
              availability={pd.availability}
              placeType={pd.placeType}
            />
          </InfoItemWrapper>
          <InfoItemWrapper label="Reviews">
            <Reviews
              reviewsWithData={pd.reviewsWithData}
              reviewStars={pd.reviewStars}
              placeId={pd.id}
            />
          </InfoItemWrapper>
          <DiscoveredByWrapper>
            <DiscoveredBy
              userId={pd.discoveredBy}
              userName={pd.userName}
              userTitle={pd.userTitle}
              userPicture={pd.userPicture}
            />
          </DiscoveredByWrapper>
          {(user.admin ||
            (user._id.toString() === pd.discoveredBy &&
              pd.checkInUsers.length < 1)) && (
            <AdminConsole>
              <DeletePlaceButton onClick={deletePlace}>
                Delete this place
              </DeletePlaceButton>

              <Selection
                onChange={onChangeStatus}
                ids={Object.keys(cons.STATUS_LIST)}
                texts={Object.entries(cons.STATUS_LIST).map(
                  (entry: any) => entry[1].text
                )}
                selectedId={pd.status}
                small
              />
            </AdminConsole>
          )}
        </LeftSection>
      </InfoWrapper>
      <CheckInModal
        visible={checkInModalVisible}
        onClose={closeCheckInModal}
        spotLat={pd.location.coordinates[1]}
        spotLng={pd.location.coordinates[0]}
        onCheckIn={onCheckIn}
      />
    </PlacePageWrapper>
  );
};

const PlacePageWrapper = styled.div`
  padding-bottom: 2rem;
`;

const SpotName = styled.div`
  ${fs.FontSizeExLarge};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 2rem;
`;

const ReviewInfo = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewLeftSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ReviewRightSection = styled.div``;

const SaveButton = styled.button<{ saved: boolean }>`
  ${ButtonText}
  ${ClickableStyle}
  display: flex;
  align-items: center;
  font-weight: 600;
  color: black;
  opacity: 0.7;
  padding: 0 0.8rem;

  ${(props) =>
    props.saved &&
    `
      opacity: 1;
      // color: ${cons.COLOR_PRIMARY_0};
  `}
`;

const SaveButtonIcon = styled.img`
  width: 1.4rem;
  margin-right: 0.3rem;
`;

const ImageWrapper = styled.div`
  margin-top: 1.4rem;
  position: relative;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  ${forMobile(`
    flex-direction: column;
 `)}
`;

const LEFT_WIDTH = 42;

const RightSection = styled.div`
  flex-grow: 1;
  margin-left: 3rem;
  margin-top: 2.2rem;
  width: calc(100% - ${LEFT_WIDTH}rem);

  ${forMobile(`
    width: 100%;
    margin-left: 0;
 `)}
`;

const LeftSection = styled.div`
  width: ${LEFT_WIDTH}rem;

  ${forMobile(`
    width: 100%;
 `)}
`;

const DiscoveredByWrapper = styled.div`
  margin-top: 3rem;
`;

const InfoItem = styled.div`
  margin-top: 2rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding-bottom: 2.5rem;
`;

const InfoLabel = styled.div`
  ${fs.FontSizeLarge}
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 1.5rem;
`;

const ReviewStars = styled.div`
  ${fs.FontSizeNormal};
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

const ReviewCnt = styled.div`
  font-weight: 400;
  margin-left: 0.2rem;
  color: ${cons.FONT_COLOR_LIGHT};
`;

export const StatusWrapper = styled.div`
  font-weight: 600;
  color: ${cons.FONT_COLOR_SECONDARY};
  display: flex;
  align-items: center;
`;

export const Status = styled.div``;

const Dot = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
`;

const PlaceType = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const UpdateImageButton = styled.button`
  ${ButtonText};
  position: absolute;
  bottom: 1rem;
  color: gray;
  left: 1rem;
`;

export const AdminConsole = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  flex-wrap: wrap;
`;

const DeletePlaceButton = styled.button`
  /* ${ButtonText} */
  ${ButtonSecondarySmallest}
  color: ${cons.COLOR_RED_0};
  border-color: ${cons.COLOR_RED_4};
`;
