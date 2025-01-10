import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import * as cons from "../../constants";

import { ButtonText } from "../../styles/styled-components/Buttons";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { MyDiscoveredPlaces } from "./DiscoveredPlaces";
import { MyReviews } from "./MyReviews";
import { callFetchDiscoveredPlaces } from "../../calls/placeCalls";
import { Place, ReviewWithPlaceData } from "../../redux/slices/placeSlice";
import { callFetchReviews } from "../../calls/reviewCall";

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
  // states
  const [discoveredPlaces, setDiscoveredPlaces] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<ReviewWithPlaceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TAB_DISCOVERED);
  // refs
  const lastFetchedUser = useRef("");

  /**
   * API Calls
   */

  const fetchDiscovered = async (loadedCnt: number) => {
    setLoading(true);
    lastFetchedUser.current = userId;
    const data = await callFetchDiscoveredPlaces(userId, loadedCnt, 15);
    setDiscoveredPlaces(data.places);
    setLoading(false);
  };

  const fetchReviews = async (loadedCnt: number) => {
    setLoading(true);
    lastFetchedUser.current = userId;
    const data = await callFetchReviews({ userId, loadedCnt, loadingCnt: 15 });
    setReviews(data.reviews);
    setLoading(false);
  };

  /**
   * User Interfaces
   */

  /**
   * Effect
   */

  useEffect(() => {
    if (activeTab === TAB_DISCOVERED) {
      fetchDiscovered(0);
    } else if (activeTab === TAB_REVIEWS) {
      fetchReviews(0);
    }
  }, [activeTab]);

  /**
   * Render
   */

  const renderContent = () => {
    if (activeTab === TAB_DISCOVERED) {
      return (
        <MyDiscoveredPlaces
          places={discoveredPlaces}
          loading={loading}
          fetchMore={fetchDiscovered}
        />
      );
    }
    return (
      <>
        <MapLinkWrapper>
          <Link href={`/reviews/${userId}`}>
            <MapLink>
              <MapIcon src="/icon/map-red.svg" />
              View Reviews on Map
            </MapLink>
          </Link>
        </MapLinkWrapper>
        <MyReviews reviews={reviews} loading={loading} fetchMore={fetchReviews} />
      </>
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

const MapLinkWrapper = styled.div`
  ${ContainerStyleInside}
  margin: 1rem 0;
`;

const MapLink = styled.a`
  display: flex;
  align-items: center;
  color: ${cons.COLOR_RED_2};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const MapIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;
