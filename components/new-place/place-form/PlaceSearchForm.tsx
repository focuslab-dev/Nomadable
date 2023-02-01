import React, { useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { SpotPrediction } from "../../../redux/slices/api/apiSpotSlice";
import { Spot } from "../../../redux/slices/placeSlice";
import { InputFormStyle } from "../../../styles/styled-components/Forms";
import { SectionLoader } from "../../commons/SectionLoader";
import { useClickOutsideEffect } from "../../../modules/hooks/useClickOutsideEffect";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";

interface Props {
  searchPlace: (text: string) => void;
  placeSearchResult: SpotPrediction[];
  selectPlace: (spot: SpotPrediction) => void;
  selectedPlace: Spot;
  clearSelectedPlace: () => void;
  isSearching: boolean;
}

export const PlaceSearchForm: React.FC<Props> = ({
  searchPlace,
  placeSearchResult,
  selectPlace,
  selectedPlace,
  clearSelectedPlace,
  isSearching,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef("");
  const timeoutRef = useRef<any>(0);
  const inputDivRef = useRef<HTMLInputElement>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  /**
   * User Interface
   */

  const onChangeInput = (e: any) => {
    clearTimeout(timeoutRef.current);
    setInput(e.target.value);
    inputRef.current = e.target.value;
    timeoutRef.current = setTimeout(() => {
      if (inputRef.current.trim().length > 0) {
        searchPlace(inputRef.current);
      }
    }, 500);
  };

  const onClickPlace = (spot: SpotPrediction) => {
    selectPlace(spot);
    setIsResultVisible(false);
  };

  const onFocusForm = () => {
    setTimeout(() => {
      setIsResultVisible(true);
    }, 100);
  };

  const onClickOutside = () => {
    setIsResultVisible(false);
  };

  const onClickSelectedPlace = () => {
    const response = window.confirm("Do you want to change the place?");
    if (response) {
      clearSelectedPlace();
    }
  };

  /**
   * Render
   */

  useClickOutsideEffect(inputDivRef, onClickOutside);

  const renderSearchResult = () => {
    if (isSearching) {
      return (
        <SearchResultWrapper>
          <SectionLoader visible />
        </SearchResultWrapper>
      );
    }

    if (isResultVisible && placeSearchResult.length > 0) {
      return (
        <SearchResultWrapper>
          {placeSearchResult.map((place) => {
            return (
              <SearchResultItem
                key={place.placeId}
                onClick={() => onClickPlace(place)}
              >
                <PinIcon src="/icon/pin-black.png" />
                <SpotInfo>
                  <SpotName>{place.mainText}</SpotName>
                  <SpotAddress>{place.secondaryText}</SpotAddress>
                </SpotInfo>
              </SearchResultItem>
            );
          })}
        </SearchResultWrapper>
      );
    }

    return null;
  };

  if (!selectedPlace.googlePlaceId)
    return (
      <PlaceSearchFormWrapper ref={inputDivRef}>
        <InputFormStyle
          placeholder="name of cafe, work space, hotel, etc."
          value={input}
          onChange={onChangeInput}
          onFocus={onFocusForm}
        />
        {renderSearchResult()}
      </PlaceSearchFormWrapper>
    );

  return (
    <SelectedPlaceWrapper onClick={onClickSelectedPlace}>
      <SelectedPlace>{selectedPlace.spotName}</SelectedPlace>
      <SelectedPlaceAddress>{selectedPlace.spotAddress}</SelectedPlaceAddress>
    </SelectedPlaceWrapper>
  );
};

const PlaceSearchFormWrapper = styled.div`
  position: relative;
`;

const SearchResultWrapper = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 0;
  width: 100%;
  min-height: 3.5rem;

  background-color: white;
  box-shadow: ${cons.SHADOW_3};
  border-radius: 0.3rem;
  padding: 0.5rem 0;

  z-index: 3;
`;

const SearchResultItem = styled.div`
  cursor: pointer;
  padding: 0.8rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;

  &:hover {
    background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  }

  /* transition: 0.1s all ease-out; */
`;

export const PinIcon = styled.img`
  width: 1rem;
  opacity: 0.4;
  transform: translateY(0.52rem);
  margin-right: 0.8rem;
`;

export const SpotInfo = styled.div``;

const SpotName = styled.div`
  ${fs.FontSizeNormal}
  font-weight: 600;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const SpotAddress = styled.div`
  ${fs.FontSizeSemiSmall}
  color: ${cons.FONT_COLOR_LIGHT};
  margin-top: 0.2rem;
  font-weight: 400;
`;

const SelectedPlaceWrapper = styled.div`
  ${ClickableStyle}
  display: inline-block;
  border: 1px solid ${cons.COLOR_PRIMARY_2};
  padding: 1rem 1.8rem;
  border-radius: 0.5rem;

  background-color: ${cons.COLOR_PRIMARY_6};
`;

const SelectedPlace = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  color: ${cons.COLOR_PRIMARY_0};
  font-weight: bold;
`;

const SelectedPlaceAddress = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  color: ${cons.COLOR_PRIMARY_0};
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  margin-top: 0.3rem;
`;
