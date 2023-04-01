import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { getCurrentLocation } from "../../../modules/Location";
import { FilterObj, initialFilterObj } from "../../../redux/slices/placeSlice";
import { forMobile } from "../../../styles/Responsive";
import { AnimationSlideLeft } from "../../../styles/styled-components/Animations";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../../styles/styled-components/Buttons";
import { FontSizeNormal } from "../../../styles/styled-components/FontSize";
import {
  FormSmallStyle,
  FormStyle,
} from "../../../styles/styled-components/Forms";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { Modal } from "../../commons/Modal";
import { ModalHeader } from "../../commons/ModalHeader";
import { Selection } from "../../commons/Selection";
import { FilterComponent } from "./filters/FilterComponent";
import { SwitchForm } from "../../commons/SwitchForm";

interface Props {
  visible: boolean;
  filterObj: FilterObj;
  onClickFilterSave: (filterObj: FilterObj) => void;
  closeModal: () => void;
  onLoadUserLocation: (userLocation: { lat: number; lng: number }) => void;
  userLocation: { lat: number; lng: number } | undefined;
  setUserLocationLoading: (loading: boolean) => void;
}

export const FilterModal: React.FC<Props> = ({
  visible,
  filterObj,
  onClickFilterSave,
  closeModal,
  onLoadUserLocation,
  userLocation,
  setUserLocationLoading,
}) => {
  const [localFilterObj, setFilterObj] = useState(filterObj);

  /**
   * User Interface
   */

  const onCloseModal = () => {
    setFilterObj(filterObj);
    closeModal();
  };

  const onChangePlaceTypes = (placeTypes: string[]) => {
    setFilterObj({ ...localFilterObj, placeTypes });
  };

  const onChangeAvailability = (availability: string[]) => {
    setFilterObj({ ...localFilterObj, availability });
  };

  const onDistanceSortSelected = async () => {
    if (userLocation) return;
    setUserLocationLoading(true);

    try {
      const location = await getCurrentLocation({
        accurate: true,
        useCache: false,
      });
      if (!location) throw Error;

      onLoadUserLocation(location);
    } catch (error) {
      setFilterObj({ ...filterObj, sortBy: cons.SORT_BY_REVIEW });
      window.alert(
        'Location is not available. Please allow "Location" in your browser settings.'
      );
    }

    setUserLocationLoading(false);
  };

  const handleChangeSortBy = (id: string) => {
    if (id === cons.SORT_BY_DISTANCE) {
      onDistanceSortSelected();
    }

    setFilterObj({ ...localFilterObj, sortBy: id });
  };

  const onClickClear = () => {
    setFilterObj(initialFilterObj);
  };

  const onClickSearch = () => {
    onClickFilterSave(localFilterObj);
    closeModal();
  };

  const onChangeWifiSpeed = (e: any) => {
    const wifiSpeed = parseInt(e.target.value);
    setFilterObj({ ...localFilterObj, wifiSpeed });
  };

  const onClickSaved = () => {
    setFilterObj({
      ...localFilterObj,
      saved: !localFilterObj.saved,
    });
  };

  /**
   * Effect
   */

  useEffect(() => {
    setFilterObj({
      ...localFilterObj,
      availability: [],
    });
  }, [localFilterObj.placeTypes]);

  /**
   * Render
   */

  return (
    <Modal visible={visible} closeModal={onCloseModal} width="28rem" alignTop>
      <ModalHeader title="Filter" onClickClose={onCloseModal} />
      <ModalBody>
        <Label>Place Types</Label>
        <FilterComponent
          onChangeFilterItems={onChangePlaceTypes}
          filterItems={localFilterObj.placeTypes}
          typeDict={cons.PLACE_TYPE_LIST}
        />

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_CAFE && (
            <SpecificForms>
              <SubLabel>Filter for Cafes</SubLabel>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_CAFE_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_WORKSPACE && (
            <SpecificForms>
              <SubLabel>Filter for Work Spaces</SubLabel>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_WORKSPACE_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_PUBLIC && (
            <SpecificForms>
              <SubLabel>Filter for Public Spaces</SubLabel>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_PUBLICSPACE_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_HOTEL && (
            <SpecificForms>
              <SubLabel>Filter for Hotels</SubLabel>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_HOTEL_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        <Line />

        <SpecificForms>
          <Label>Advanced</Label>
          <FilterWrapper>
            <FilterLabel>WiFi Speed</FilterLabel>
            <WiFiFormWrapper>
              <NumberForm
                value={localFilterObj.wifiSpeed}
                onChange={onChangeWifiSpeed}
                type="number"
              />
              <Unit>mbps</Unit>
            </WiFiFormWrapper>
          </FilterWrapper>
          <FilterWrapper>
            <FilterLabel>Only Saved Places</FilterLabel>
            <SwitchForm
              active={localFilterObj.saved}
              onClick={onClickSaved}
              activeText="On"
              inactiveText="Off"
            />
          </FilterWrapper>
        </SpecificForms>

        <Line />

        <SpecificForms>
          <Label>Sort By</Label>
          <Selection
            ids={Object.keys(cons.SORT_LIST)}
            texts={Object.entries(cons.SORT_LIST).map(
              (entry: any) => entry[1].text
            )}
            selectedId={localFilterObj.sortBy}
            onChange={handleChangeSortBy}
          />
        </SpecificForms>
      </ModalBody>
      <Footer>
        <CancelButton onClick={onClickClear}>Clear Filter</CancelButton>
        <SubmitButton onClick={onClickSearch}>Search</SubmitButton>
      </Footer>
    </Modal>
  );
};

const ModalBody = styled.div`
  ${ContainerStyleInside};
  padding-top: 1.5rem;
  padding-bottom: 1.6rem;
`;

const Label = styled.div`
  ${FontSizeNormal}
  margin-bottom: 1rem;
  /* margin-top: 1rem; */
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Footer = styled.div`
  ${ContainerStyleInside}
  display:flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

  ${forMobile(`
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-top: 2rem;
    `)}
`;
const CancelButton = styled.button`
  ${ButtonText};
  margin-right: 4rem;
`;
const SubmitButton = styled.button`
  ${ButtonBlackSmall};
`;

const SpecificForms = styled.div`
  ${AnimationSlideLeft};
  margin-top: 0rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const FilterLabel = styled.div`
  /* font-weight: bold; */
  font-weight: 500;
  color: ${cons.FONT_COLOR_SECONDARY};
  color: ${cons.FONT_COLOR_LIGHT};
`;

const NumberForm = styled.input`
  ${FormStyle}
  ${FormSmallStyle}
  width: 5rem;
`;

const WiFiFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Unit = styled.div`
  margin-left: 0.5rem;
  color: ${cons.FONT_COLOR_SECONDARY};
  font-weight: 400;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  margin-top: 1.8rem;
  margin-bottom: 1.5rem;
`;

const SubLabel = styled(Label)`
  margin-top: 1.4rem;
`;
