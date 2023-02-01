import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { convertTimestampToTimeAgo } from "../../modules/DateUtils";
import { useAppDispatch } from "../../redux/hooks";
import { EventWithData } from "../../redux/slices/eventSlice";
import { updateVisibleModal } from "../../redux/slices/uiSlice";
import { forMobile } from "../../styles/Responsive";
import {
  FontSizeNormal,
  FontSizeSemiSmall,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { NotificationMarkCss } from "../../styles/styled-components/UIs";
import { PlaceCard } from "./PlaceCard";

interface EventItemProps extends EventWithData {
  seen?: boolean;
}

interface Props {
  eventWithData: EventItemProps;
}

export const EventItem: React.FC<Props> = ({
  eventWithData: {
    _id,
    userId,
    title,
    timestamp,
    placeId,
    body,
    isOfficial,
    // user
    userPicture,
    userSubId,
    // place
    placePictures,
    placeType,
    placeName,
    placeAddress,
    // notification
    seen,
  },
}) => {
  const dispatch = useAppDispatch();

  const onClickUser = () => {
    dispatch(
      updateVisibleModal({ id: cons.MODAL_USER_INFO, referenceId: userId })
    );
  };

  return (
    <Wrapper>
      <NotificationMark visible={seen === false} />
      <ItemContainer>
        <ProfilePic src={userPicture} onClick={onClickUser} />
        <MainSection>
          <MainSectionInner>
            <TitleRow>
              <UserSubId onClick={onClickUser}>@{userSubId}</UserSubId>
              {`${title}`}
              <DateTime>{convertTimestampToTimeAgo(timestamp)}</DateTime>
            </TitleRow>
            <Body>{body}</Body>
            {placeId && (
              <PlaceCard
                placeId={placeId}
                pictures={placePictures}
                name={placeName}
                address={placeAddress}
              />
            )}
          </MainSectionInner>
        </MainSection>
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const ItemContainer = styled.div`
  ${ContainerStyleInside};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
`;

const ProfilePic = styled.img`
  ${ClickableStyle}
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
`;

const MainSection = styled.div`
  margin-left: 1.2rem;
  width: 100%;
`;

const MainSectionInner = styled.div`
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  ${FontSizeNormal};
  /* color: ${cons.FONT_COLOR_SECONDARY}; */
  font-weight: 400;

  ${forMobile(`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

const UserSubId = styled.div`
  ${ClickableStyle}
  font-weight: bold;
  margin-right: 0.4em;
  color: ${cons.FONT_COLOR_NORMAL};
  max-width: 10rem;
  word-break: break-all;
`;

const DateTime = styled.div`
  margin-left: 0.8em;
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall}

  ${forMobile(`
  margin-left: 0;
  `)}
`;

const Body = styled.div``;

const NotificationMark = styled.div<{ visible: boolean }>`
  ${NotificationMarkCss};
  left: 4.2rem;
  top: 1rem;
`;
