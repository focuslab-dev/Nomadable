import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Modal } from "../commons/Modal";
import { useAppSelector } from "../../redux/hooks";
import {
  selectVisibleModal,
  updateVisibleModal,
} from "../../redux/slices/uiSlice";
import { useDispatch } from "react-redux";
import { selectCitiesWithData } from "../../redux/slices/citySlice";
import { SearchResultItem } from "./SearchResultItem";
import { FormStyle } from "../../styles/styled-components/Forms";
import { CityWithData } from "../../data/articles/cities";
import {
  FontSizeNormal,
  FontSizeSemiLarge,
} from "../../styles/styled-components/FontSize";
import { useRouter } from "next/router";

interface Props {}

export const PlaceSearchModal: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // from store
  const visible =
    useAppSelector(selectVisibleModal).modalId === cons.MODAL_PLACE_SEARCH;
  const citiesWithData = useAppSelector(selectCitiesWithData);
  // local state
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<CityWithData[]>([]);

  /**
   * Modules
   */

  const filterCities = (cities: CityWithData[], searchText: string) => {
    return cities.filter((city) => {
      const cityStr = city.city.toLowerCase();
      const countryStr = city.country.toLowerCase();
      const searchTextStr = searchText.toLowerCase();
      return (
        cityStr.includes(searchTextStr) || countryStr.includes(searchTextStr)
      );
    });
  };

  /**
   * User Interaction
   */

  const closeModal = () => {
    dispatch(updateVisibleModal({ id: "" }));
  };

  const onChangeInpput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const filteredCities = filterCities(citiesWithData, e.target.value);
    setSearchResult(filteredCities);
  };

  const onClickCity = (citySlug: string) => {
    router.push(`/${citySlug}`);
    closeModal();
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (citiesWithData && citiesWithData.length > 0) {
      setSearchResult(citiesWithData);
    }
  }, [citiesWithData]);

  /**
   * Render
   */

  return (
    <Modal visible={visible} width="25rem" closeModal={closeModal} alignTop>
      <Container>
        <SearchBarSection>
          <SearchBarIcon src="/icon/search-black.png" />
          <SearchBarInput
            value={searchText}
            onChange={onChangeInpput}
            placeholder="city or country"
          />
        </SearchBarSection>

        {searchResult.length > 0 && (
          <SearchResultSection>
            {searchResult.map((city) => (
              <SearchResultItem
                key={city.slug}
                city={city}
                onClickCity={onClickCity}
              />
            ))}
          </SearchResultSection>
        )}
      </Container>
    </Modal>
  );
};

const SearchBarSection = styled.div`
  position: relative;
  padding-left: 2.2rem;
  box-sizing: border-box;
`;
const SearchBarIcon = styled.img`
  width: 1.1rem;
  position: absolute;
  opacity: 0.6;
  left: 1.2rem;
  top: 1rem;
`;
const SearchBarInput = styled.input`
  ${FormStyle};
  border: none;
  ${FontSizeNormal}
  font-size: 1.1rem;
`;
const SearchResultSection = styled.div`
  overflow: auto;
  max-height: calc(100vh - 15rem);
  border-top: 1px solid #ccc;

  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Container = styled.div``;
