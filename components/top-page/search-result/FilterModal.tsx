import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { getCurrentLocation } from "../../../modules/Location";
import newPlace from "../../../pages/new-place";
import { FilterObj, initialFilterObj } from "../../../redux/slices/placeSlice";
import { forMobile } from "../../../styles/Responsive";
import { AnimationSlideLeft } from "../../../styles/styled-components/Animations";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../../styles/styled-components/Buttons";
import { FormLabelStyle } from "../../../styles/styled-components/Forms";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { Modal } from "../../commons/Modal";
import { ModalHeader } from "../../commons/ModalHeader";
import { Selection } from "../../commons/Selection";
import { ToggleForm } from "../../new-place/detail-form/ToggleForm";
// import { FilterForCafe } from "./filters/FilterForCafe";
import { FilterComponent } from "./filters/FilterComponent";

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

  const onChangeOthers = (others: string[]) => {
    setFilterObj({
      ...localFilterObj,
      saved: others.includes(cons.OTHERS_SAVED),
    });
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
    <Modal visible={visible} closeModal={onCloseModal} width="32rem" alignTop>
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
              <Label>Filter for Cafes</Label>
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
              <Label>Filter for Work Spaces</Label>
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
              <Label>Filter for Public Spaces</Label>
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
              <Label>Filter for Hotels</Label>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_HOTEL_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        <SpecificForms>
          <Label>Others</Label>
          <FilterComponent
            onChangeFilterItems={onChangeOthers}
            filterItems={localFilterObj.saved ? [cons.OTHERS_SAVED] : []}
            typeDict={cons.OTHERS_LIST}
            allowAllSelect
          />
        </SpecificForms>

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
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

const Label = styled.div`
  ${HeaderSmall}
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
  margin-top: 1rem;
`;
