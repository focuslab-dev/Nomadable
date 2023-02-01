import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useScrolllPosition } from "../../modules/hooks/useScrollPosition";
import { useViewHeight } from "../../modules/hooks/useViewHeight";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchPlaces,
  selectApiFetchPlacesStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import { apiFetchContributersArea } from "../../redux/slices/api/apiUserSlice";
import { selectContributersArea } from "../../redux/slices/contributerSlice";
import {
  FilterObj,
  initialFilterObj,
  MapArea,
  Place,
  PlaceHeader,
  selectPlaceSearchResultHistory,
} from "../../redux/slices/placeSlice";
import { forMobile } from "../../styles/Responsive";
import { AnimationSlideUp } from "../../styles/styled-components/Animations";
import {
  FontSizeSemiSmall,
  FontSizeSmall,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { MapSearch } from "../map-search/MapSearch";
import { SectionLoader } from "../commons/SectionLoader";
import { FilterModal } from "./search-result/FilterModal";
import { SearchResult } from "./search-result/SearchResult";
import { getFilterCount } from "./search-result/filters/getFilterCount";
import { PageLoader } from "../commons/PageLoader";
import { CheckInButton } from "../map-search/CheckInButton";

interface Props {
  places: PlaceHeader[];
  searchResultTotalCnt: number;
}

export const TopPage: React.FC<Props> = ({ places, searchResultTotalCnt }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // store
  const contributers = useAppSelector(selectContributersArea);
  const apiFetchPlacesStatus = useAppSelector(selectApiFetchPlacesStatus);
  const searchResultHistory = useAppSelector(selectPlaceSearchResultHistory);
  // ref
  const fetchTimeoutRef = useRef<any>(0);
  // local state
  const [mapArea, setMapArea] = useState<null | MapArea>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filterObj, setFilterObj] = useState<FilterObj>(initialFilterObj);
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState("");
  // custom hook
  const [viewHeight] = useViewHeight();
  const [scrollPosition] = useScrolllPosition();
  const [userLocation, setUserLocation] = useState<
    undefined | { lat: number; lng: number }
  >(undefined);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const lastFilterRef = useRef<FilterObj>(initialFilterObj);

  /**
   * Modules
   */

  const searchPlaces = (
    mapArea: MapArea,
    pageIndex: number,
    _filterObj: FilterObj,
    filterChanged: boolean,
    userLng?: number,
    userLat?: number
  ) => {
    dispatch(
      apiFetchPlaces({
        mapArea,
        pageIndex,
        filterObj: _filterObj,
        filterChanged,
        userLng,
        userLat,
      })
    );
  };

  const fetchContributersArea = (placeIds: string[]) => {
    clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => {
      dispatch(apiFetchContributersArea({ placeIds }));
    }, 1000);
  };

  const changeFilterVisible = (ev: any, visible: boolean) => {
    ev.preventDefault();
    ev.stopPropagation();
    setFilterVisible(visible);
  };

  /**
   * User Interface
   */

  const onChangeMapArea = (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => {
    setMapArea({
      latStart,
      lngStart,
      latEnd,
      lngEnd,
    });
  };

  const onClickMarker = (placeId: string) => {
    setSelectedPlace(placeId);
  };

  const onChangePageIndex = (pageIndex: number) => {
    setPageIndex(pageIndex);
  };

  const onChangeFilterObj = (_filterObj: FilterObj) => {
    setFilterObj(_filterObj);
  };

  const onClickToggle = (smooth?: boolean) => {
    if (window.scrollY < 5) {
      const top = viewHeight - 240;
      window.scrollTo({
        top,
        behavior: smooth ? "smooth" : "auto",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const onChangeFilterVisible = (visible: boolean) => {
    setFilterVisible(visible);
  };

  const onClickFilterSave = (filterObj: FilterObj) => {
    onChangeFilterVisible(false);
    onChangeFilterObj(filterObj);
  };

  const closeFilterModal = () => {
    onChangeFilterVisible(false);
  };

  const onHoverPlace = (placeId: string) => {
    setHoveredPlace(placeId);
  };

  const onLoadUserLocation = (userLocation: { lat: number; lng: number }) => {
    setUserLocation(userLocation);
  };

  const setUserLocationLoading = (loading: boolean) => {
    setLoadingLocation(loading);
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (!mapArea) return;
    const { latStart, lngStart, latEnd, lngEnd } = mapArea;
    router.push(
      {
        pathname: cons.PATH_HOME,
        query: { latStart, lngStart, latEnd, lngEnd },
      },
      undefined,
      { shallow: true }
    );
  }, [mapArea]);

  useEffect(() => {
    if (!mapArea) return;
    searchPlaces(
      mapArea,
      pageIndex,
      filterObj,
      lastFilterRef.current !== filterObj,
      userLocation && userLocation.lng,
      userLocation && userLocation.lat
    );
    lastFilterRef.current = filterObj;
  }, [mapArea, pageIndex, filterObj]);

  useEffect(() => {
    // if (places.length > 0) {
    const placeIds = places.map((place) => place.id);
    fetchContributersArea(placeIds);
    // }
  }, [places]);

  useEffect(() => {
    if (scrollPosition.scrollY > 50) {
      setScrollButtonVisible(true);
    } else {
      setScrollButtonVisible(false);
    }
  }, [scrollPosition]);

  /**
   * Render
   */

  const renderFilterCount = () => {
    const filterCnt = getFilterCount(filterObj);

    if (filterCnt < 1) return null;
    return <FilterCnt>{filterCnt}</FilterCnt>;
  };

  //

  return (
    <TopPageWrapper>
      <PageLoader visible={loadingLocation} message="Loading..." />
      <SearchResultSection viewHeight={viewHeight}>
        <PullTabForMobile onClick={() => onClickToggle(false)}>
          <SectionLoader
            visible={apiFetchPlacesStatus.status === cons.API_LOADING}
          />
          <TabTitle>
            {apiFetchPlacesStatus.status !== cons.API_LOADING &&
              `${searchResultTotalCnt} Places to Work From`}
          </TabTitle>
          <FilterButtonForMobile
            onClick={(ev: any) => changeFilterVisible(ev, true)}
          >
            {renderFilterCount()}
            <FilterIcon src="/icon/filter-black3.svg" />
          </FilterButtonForMobile>
        </PullTabForMobile>
        <SearchResult
          places={places}
          onChangePageIndex={onChangePageIndex}
          width={RESULT_WIDTH}
          selectedPlace={selectedPlace}
          contributers={contributers}
          // onChangeFilterObj={onChangeFilterObj}
          filterObj={filterObj}
          // filterVisible={filterVisible}
          onChangeFilterVisible={onChangeFilterVisible}
          searchResultTotalCnt={searchResultTotalCnt}
          onHoverPlace={onHoverPlace}
        />
      </SearchResultSection>
      <MapSection viewHeight={viewHeight}>
        <MapSearch
          mapId="search-places"
          places={searchResultHistory}
          onChange={onChangeMapArea}
          onClickMarker={onClickMarker}
          selectedPlace={selectedPlace}
          viewHeight={viewHeight}
          hoveredPlace={hoveredPlace}
        />
      </MapSection>

      <ScrollUpButton
        onClick={() => onClickToggle(false)}
        visible={scrollButtonVisible}
      >
        <ScrollUpIcon src="/icon/up-arrow-white.svg" />
      </ScrollUpButton>

      <FilterModal
        visible={filterVisible}
        filterObj={filterObj}
        onClickFilterSave={onClickFilterSave}
        closeModal={closeFilterModal}
        onLoadUserLocation={onLoadUserLocation}
        userLocation={userLocation}
        setUserLocationLoading={setUserLocationLoading}
      />

      <MapButtons mobileHidden={scrollButtonVisible || filterVisible}>
        <CheckInButton />
      </MapButtons>
    </TopPageWrapper>
  );
};

const HEADER_HEIGHT = 5;
const RESULT_WIDTH = 36;

const TopPageWrapper = styled.div`
  background-color: #c9d2d3;
  display: flex;
  width: calc(100% + 4rem);
  margin-left: -2rem;
  min-height: calc(100vh - ${HEADER_HEIGHT}rem);
  padding-top: ${HEADER_HEIGHT}rem;

  ${forMobile(`
    position: relative;
    background-color: #c9d2d3;
    margin-left: -2rem;
    width: calc(100% + 2.7rem);
  `)}
`;

const SearchResultSection = styled.div<{ viewHeight: number }>`
  width: ${RESULT_WIDTH}rem;
  background-color: white;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    z-index: 2;
    background-color: white;
    position: absolute;

    left: 1.3rem;
    width: calc(100% - 1.3rem);
    top: calc(${(props) => props.viewHeight}px - 10rem);
    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;
    min-height: 10rem;
  }
`;

const PullTabForMobile = styled.div`
  ${ClickableStyle}
  height: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  ${FontSizeSemiSmall};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  position: relative;
  display: none;
  ${forMobile(`
    display:flex;;
 `)}
`;

export const TabTitle = styled.div``;

const MapSection = styled.div<{ viewHeight: number }>`
  width: calc(100% - ${RESULT_WIDTH}rem);
  height: calc(100vh - ${HEADER_HEIGHT}rem);
  position: fixed;
  top: ${HEADER_HEIGHT}rem;
  right: 0;
  z-index: 1;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    position: fixed;
    top: 5rem;
    left: 0rem;
    width: calc(100%);
    z-index: 1;
    height: calc(${(props) => props.viewHeight}px - 15rem);
  }
`;

export const MapButtons = styled.div<{ mobileHidden: boolean }>`
  ${AnimationSlideUp}
  position: fixed;
  top: 6.5rem;
  left: 38rem;
  z-index: 2;

  ${forMobile(`
    top: 6rem;
    left: 1rem;
    z-index: 3;
    `)}

  ${(props) =>
    props.mobileHidden &&
    `
    display: block;
    ${forMobile(`
      display: none;
    `)}
    `}
`;

const ScrollUpButton = styled.button<{ visible: boolean }>`
  ${ClickableStyle}
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 0.5rem;
  z-index: 2;
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 100%;
  border: none;
  box-shadow: ${cons.SHADOW_3};
  background-color: white;
  background-color: ${cons.COLOR_PRIMARY_2};
  color: white;
  ${AnimationSlideUp}

  ${(props) =>
    props.visible &&
    `
    ${forMobile(`
      display:block;
  `)}
  `};
`;

const ScrollUpIcon = styled.img`
  width: 1.3rem;
  opacity: 0.9;
`;

const FilterButtonForMobile = styled.button`
  ${ClickableStyle}
  display: none;
  position: absolute;
  /* top: 1.2rem; */
  right: 1.2rem;
  z-index: 10;
  border-radius: 0.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;

  ${forMobile(`
      display: flex;  
  `)}
`;

const FilterIcon = styled.img`
  width: 1.2rem;
  opacity: 0.5;
`;

const FilterCnt = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.9rem;
  margin-left: 0.4rem;
  background-color: ${cons.COLOR_RED_3};
  background-color: ${cons.FONT_COLOR_SECONDARY};
  color: white;
  width: 1.4rem;
  height: 1.4rem;
  ${FontSizeSmall}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* box-shadow: ${cons.SHADOW_0}; */
  font-weight: bold;
`;
