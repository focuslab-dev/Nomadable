import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import {
  FilterObj,
  Place,
  PlaceHeader,
} from "../../../redux/slices/placeSlice";
import {
  ButtonSecondarySmall,
  ButtonSecondarySmallest,
} from "../../../styles/styled-components/Buttons";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { Contributers } from "./Contributers";
import { Pagination } from "./Pagination";
import {
  Header3,
  Header4,
  HeaderSmall,
} from "../../../styles/styled-components/Texts";
import { PlaceItem } from "./PlaceItem";
import { AnimationSlideUp } from "../../../styles/styled-components/Animations";
import { SectionLoader } from "../../commons/SectionLoader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apiSavePlace,
  selectApiFetchPlacesStatus,
} from "../../../redux/slices/api/apiPlaceSlice";
import { Contributer } from "../../../redux/slices/contributerSlice";
import { FilterModal } from "./FilterModal";
import { forMobile } from "../../../styles/Responsive";
import { selectAuthenticated } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { getFilterCount } from "./filters/getFilterCount";
import Link from "next/link";

const HEADER_HEIGHT = 5;

interface Props {
  places: PlaceHeader[];
  onChangePageIndex: (pageIndex: number) => void;
  width: number;
  selectedPlace: string;
  contributers: Contributer[];
  // onChangeFilterObj: (filterObj: FilterObj) => void;
  filterObj: FilterObj;
  // filterVisible: boolean;
  onChangeFilterVisible: (visible: boolean) => void;
  searchResultTotalCnt: number;
  onHoverPlace: (placeId: string) => void;
}

export const SearchResult: React.FC<Props> = ({
  places,
  onChangePageIndex,
  width,
  selectedPlace,
  contributers,
  // onChangeFilterObj,
  filterObj,
  // filterVisible,
  onChangeFilterVisible,
  searchResultTotalCnt,
  onHoverPlace,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);
  const authenticated = useAppSelector(selectAuthenticated);
  // const [filterVisible, setFilterVisible] = useState(false);

  const onClickFilterButton = () => {
    onChangeFilterVisible(true);
  };

  const onClickSave = (event: any, placeId: string, saved: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (authenticated) {
      dispatch(apiSavePlace({ placeId, saved }));
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

  /**
   * Effect
   */
  useEffect(() => {
    const element = document.getElementById(`element_${selectedPlace}`);
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [selectedPlace]);

  /**
   * Render
   */

  const renderFilterCount = () => {
    const filterCnt = getFilterCount(filterObj);
    if (filterCnt < 1) return null;
    return <FilterCnt>{filterCnt}</FilterCnt>;
  };

  return (
    <Wrapper>
      <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
      <Header width={width}>
        <PageTitle>{searchResultTotalCnt} Places to Work From</PageTitle>
        <FilterButton onClick={onClickFilterButton}>
          <FilterIcon src="/icon/filter-black3.svg" />
          Filter
          {renderFilterCount()}
        </FilterButton>
      </Header>
      <NotFixed>
        <ItemContainer>
          {places.length < 1 && (
            <NoResult>There is no search result in the area.</NoResult>
          )}
          {places.map((place) => (
            <PlaceWrapper
              key={place.id}
              id={`element_${place.id}`}
              onMouseEnter={
                isMobile
                  ? () => {
                      return false;
                    }
                  : () => {
                      onHoverPlace(place.id);
                    }
              }
              onMouseLeave={
                isMobile
                  ? () => {
                      return false;
                    }
                  : () => {
                      onHoverPlace("");
                    }
              }
            >
              <Link href={`/place/${place.id}`} passHref>
                <LinkA target="_blank" rel="noopener noreferrer">
                  <PlaceItem
                    place={place}
                    selected={
                      selectedPlace === ""
                        ? undefined
                        : place.id === selectedPlace
                    }
                    onClickSave={onClickSave}
                  />
                </LinkA>
              </Link>
            </PlaceWrapper>
          ))}
        </ItemContainer>

        <PaginationSection>
          <Pagination />
        </PaginationSection>

        <ContributersSection>
          <ContributersLabel>Top Contributers</ContributersLabel>
          <ContributersCard>
            <Contributers contributers={contributers} />
          </ContributersCard>
        </ContributersSection>
      </NotFixed>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${ContainerStyleInside};
  min-height: 100%;
  position: relative;
`;

const Header = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  position: fixed;
  top: ${HEADER_HEIGHT}rem;
  z-index: 1;
  width: ${(props) => props.width}rem;
  box-sizing: border-box;
  margin-left: -2rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

  ${forMobile(`
  display:none;
  `)}
`;

// const Scroller = styled.div`
//   overflow-y: scroll;
// `;

const NotFixed = styled.div`
  padding-top: 6rem;
  ${forMobile(`
      padding-top: 2rem;
  `)}
`;

const PageTitle = styled.div`
  ${HeaderSmall};
  margin: 0;
`;

const FilterButton = styled.button`
  ${ButtonSecondarySmallest};
  margin-left: 2rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const FilterCnt = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  margin-left: 0.4rem;
  background-color: ${cons.COLOR_RED_3};
  background-color: ${cons.FONT_COLOR_SECONDARY};
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  ${fs.FontSizeSemiSmall}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* box-shadow: ${cons.SHADOW_0}; */
  font-weight: bold;
`;

const FilterIcon = styled.img`
  opacity: 0.5;
  width: 1.1rem;
  margin-right: 0.6rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  min-height: 100%;
  z-index: 0;

  /* gap: 0.5rem; */
`;

const NoResult = styled.div`
  margin-top: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeNormal};
`;

const PlaceWrapper = styled.div`
  width: calc(50% - 0.7rem);

  ${forMobile(`
    width: 100%;
  `)}
`;

const PaginationSection = styled.div``;

const ContributersSection = styled.div``;

export const ContributersLabel = styled.div`
  ${Header3}
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

export const ContributersCard = styled.div`
  border: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  ${ContainerStyleInside}
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  border-radius: 0.7rem;
`;

export const LinkA = styled.a``;

export const MouseOverHandler = styled.div`
  ${forMobile(`
    display:none;
  `)}
`;
