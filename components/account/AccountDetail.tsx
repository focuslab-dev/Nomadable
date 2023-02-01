import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import places from "../../pages/api/places";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchDiscoveredPlaces,
  initApiFetchDiscoveredPlacesState,
  selectApiFetchDiscoveredPlacesStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  apiFetchReviews,
  initApiFetchReviewsState,
  selectApiFetchReviewsStatus,
} from "../../redux/slices/api/apiReviewSlice";
import { Place } from "../../redux/slices/placeSlice";
import {
  initDiscoveredAndReviews,
  selectDiscoveredPlaces,
  selectUserReviews,
} from "../../redux/slices/userSlice";
import { ButtonText } from "../../styles/styled-components/Buttons";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { MyDiscoveredPlaces } from "./DiscoveredPlaces";
import { MyReviews } from "./MyReviews";

interface Props {
  userId: string;
  discoveredCnt: number;
  reviewCnt: number;
}

const TAB_DISCOVERED = "discovered";
const TAB_REVIEWS = "reviews";

export const AccountDetail: React.FC<Props> = ({
  userId,
  discoveredCnt,
  reviewCnt,
}) => {
  const dispatch = useAppDispatch();
  // store
  const apiStatusDiscovered = useAppSelector(
    selectApiFetchDiscoveredPlacesStatus
  );
  const discoveredPlaces = useAppSelector(selectDiscoveredPlaces);
  const apiStatusReviews = useAppSelector(selectApiFetchReviewsStatus);
  const reviews = useAppSelector(selectUserReviews);
  // local state
  const [activeTab, setActiveTab] = useState(TAB_DISCOVERED);
  const lastFetchedUser = useRef("");

  /**
   * API Calls
   */

  const fetchDiscovered = (loadedCnt: number) => {
    lastFetchedUser.current = userId;
    dispatch(
      apiFetchDiscoveredPlaces({
        userId,
        loadedCnt,
        loadingCnt: 15,
      })
    );
  };

  const fetchReviews = (loadedCnt: number) => {
    lastFetchedUser.current = userId;
    dispatch(
      apiFetchReviews({
        userId,
        loadedCnt,
        loadingCnt: 15,
        latest: true,
      })
    );
  };

  /**
   * User Interfaces
   */

  /**
   * Effect
   */

  useEffect(() => {
    if (
      activeTab === TAB_DISCOVERED &&
      apiStatusDiscovered.status === cons.API_IDLE
    ) {
      fetchDiscovered(0);
    } else if (
      activeTab === TAB_REVIEWS &&
      apiStatusReviews.status === cons.API_IDLE
    ) {
      fetchReviews(0);
    }
  }, [activeTab]);

  useEffect(() => {
    if (userId !== lastFetchedUser.current) {
      dispatch(initDiscoveredAndReviews());
      dispatch(initApiFetchDiscoveredPlacesState());
      dispatch(initApiFetchReviewsState());
      fetchDiscovered(0);
    }
  }, [userId]);

  /**
   * Render
   */

  const renderContent = () => {
    if (activeTab === TAB_DISCOVERED) {
      return (
        <MyDiscoveredPlaces
          places={discoveredPlaces}
          loading={apiStatusDiscovered.status === cons.API_LOADING}
          fetchMore={fetchDiscovered}
        />
      );
    }
    return (
      <MyReviews
        reviews={reviews}
        loading={apiStatusReviews.status === cons.API_LOADING}
        fetchMore={fetchReviews}
      />
    );
  };

  return (
    <AccountDetailWrapper>
      <Navigator>
        <NavItem
          onClick={() => setActiveTab(TAB_DISCOVERED)}
          active={activeTab === TAB_DISCOVERED}
        >
          Discovered <ItemCnt>{discoveredCnt}</ItemCnt>
        </NavItem>
        <NavItem
          onClick={() => setActiveTab(TAB_REVIEWS)}
          active={activeTab === TAB_REVIEWS}
        >
          Reviews <ItemCnt>{reviewCnt}</ItemCnt>
        </NavItem>
      </Navigator>
      {renderContent()}
    </AccountDetailWrapper>
  );
};

const AccountDetailWrapper = styled.div``;

const Navigator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  gap: 2rem;
  ${ContainerStyleInside}
`;

const NavItem = styled.button<{ active: boolean }>`
  ${ButtonText};
  height: 3rem;
  border-bottom: 0.3rem solid white;

  ${(props) =>
    props.active &&
    `
    color: ${cons.FONT_COLOR_NORMAL};
    border-bottom: 0.25rem solid ${cons.COLOR_RED_2};
  `};
`;

const ItemCnt = styled.span`
  font-weight: 400;
  margin-left: 0.2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall}
`;
