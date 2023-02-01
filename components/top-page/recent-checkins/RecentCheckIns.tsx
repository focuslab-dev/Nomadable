import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import {
//   apiFetchRecentCheckIns,
//   selectApiFetchRecentCheckInsStatus,
// } from "../../../redux/slices/api/apiPlaceSlice";
import { selectRecentCheckIns } from "../../../redux/slices/placeSlice";
import { selectAuthenticated } from "../../../redux/slices/userSlice";
import { ButtonSecondaryMedium } from "../../../styles/styled-components/Buttons";
import {
  DropDownItemStyle,
  DropdownWindowStyle,
} from "../../../styles/styled-components/Dropdown";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { AnimationFadeIn } from "../../../styles/styled-components/Animations";
import { forMobile } from "../../../styles/Responsive";

interface Props {}

export const RecentCheckIns: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  // const apiStatus = useAppSelector(selectApiFetchRecentCheckInsStatus);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const recentCheckIns = useAppSelector(selectRecentCheckIns);

  const [visible, setVisible] = useState(false);

  const onClickToggle = () => {
    setVisible(true);
  };

  // useEffect(() => {
  //   if (isAuthenticated && apiStatus.status === cons.API_IDLE) {
  //     dispatch(apiFetchRecentCheckIns({}));
  //   }
  // }, [isAuthenticated, apiStatus]);

  if (!isAuthenticated || recentCheckIns.length < 1) return null;

  return (
    <RecentCheckInsWrapper>
      {!visible ? (
        <ToggleButton onClick={onClickToggle}>Recent Check-Ins</ToggleButton>
      ) : (
        <RecentCheckInWindow visible={visible} alignLeft width="24rem">
          <CloseButton onClick={() => setVisible(false)}>
            <CloseIcon src="/icon/cross-black.png" />
          </CloseButton>
          {recentCheckIns.map((place) => {
            return (
              <Link href={`/place/${place.id}`} key={place.id} passHref>
                <a target="_blacnk" rel="noopener">
                  <PlaceItem>
                    <Name>{place.spotName}</Name>
                    <Address>{place.spotAddress}</Address>
                  </PlaceItem>
                </a>
              </Link>
            );
          })}
        </RecentCheckInWindow>
      )}
    </RecentCheckInsWrapper>
  );
};

const RecentCheckInsWrapper = styled.div`
  position: absolute;
  top: 1.3rem;
  left: 1.3rem;
  z-index: 11;
`;

const ToggleButton = styled.button`
  ${ButtonSecondaryMedium};
  padding: 0 1.8rem;
  border-radius: 50px;
  border: none;
  box-shadow: ${cons.SHADOW_3};
  ${AnimationFadeIn}
`;

const RecentCheckInWindow = styled.div`
  ${DropdownWindowStyle};
  margin-top: -1rem;
  ${AnimationFadeIn}

  ${forMobile(`
    width: 18rem;
 `)}
`;

const PlaceItem = styled.div`
  ${DropDownItemStyle}
`;

const Name = styled.div``;

const Address = styled.div`
  font-weight: 300;
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSmall};
  /* margin-top: 0.3rem; */
`;

const CloseButton = styled.div`
  box-shadow: ${cons.SHADOW_0};
  ${ClickableStyle}
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  background-color: white;
  border-radius: 100%;
  /* border: 1px solid ${cons.FONT_COLOR_LIGHTEST}; */
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled.img`
  width: 0.6rem;
  opacity: 0.5;
`;
