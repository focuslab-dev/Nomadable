import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import newPlace from "../../pages/new-place";
import { AnimationSlideLeft } from "../../styles/styled-components/Animations";
import * as fs from "../../styles/styled-components/FontSize";
import { PlaceTypeForm } from "../new-place/detail-form/PlaceTypeForm";
import { ToggleForm } from "../new-place/detail-form/ToggleForm";

interface Props {
  placeType: string;
  availability: string[];
  onChangePlaceType: (placeType: string) => void;
  onClickSwitch: (item: string) => void;
}

export const AvailabilityForm: React.FC<Props> = ({
  placeType,
  availability,
  onChangePlaceType,
  onClickSwitch,
}) => {
  return (
    <Fragment>
      <Label>Type of place</Label>
      <FormWrapper>
        <PlaceTypeForm onChange={onChangePlaceType} placeType={placeType} />
      </FormWrapper>

      {placeType === cons.PLACE_TYPE_CAFE && (
        <SpecificForms>
          <ToggleForm
            title="Is power socket available?"
            item={cons.AVL_POWER_SOCKET}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_POWER_SOCKET)}
          />

          <ToggleForm
            title="Are there food menus?"
            item={cons.AVL_FOOD_MENU}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_FOOD_MENU)}
          />
        </SpecificForms>
      )}

      {placeType === cons.PLACE_TYPE_WORKSPACE && (
        <SpecificForms>
          <ToggleForm
            title="Is Drop-in available?"
            item={cons.AVL_DROP_IN}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_DROP_IN)}
          />

          <ToggleForm
            title="Can you rent monitors?"
            item={cons.AVL_RENTAL_MONITOR}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_RENTAL_MONITOR)}
          />
        </SpecificForms>
      )}

      {placeType === cons.PLACE_TYPE_PUBLIC && (
        <SpecificForms>
          <ToggleForm
            title="Is it (or does it include) an outdoor space?"
            item={cons.AVL_OPEN_AIR}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_OPEN_AIR)}
          />

          <ToggleForm
            title="Is it (or does it include) an indoor space?"
            item={cons.AVL_INDOOR}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_INDOOR)}
          />
        </SpecificForms>
      )}

      {placeType === cons.PLACE_TYPE_HOTEL && (
        <SpecificForms>
          <ToggleForm
            title="Is co-working space available?"
            item={cons.AVL_WORKSPACE}
            onClickSwitch={onClickSwitch}
            active={availability.includes(cons.AVL_WORKSPACE)}
          />
        </SpecificForms>
      )}
    </Fragment>
  );
};

const Label = styled.div`
  font-weight: bold;
  ${fs.FontSizeSemiLarge}
  color: ${cons.FONT_COLOR_NORMAL};
`;

const LabelIcon = styled.span`
  margin-right: 0.8rem;
`;

const FormWrapper = styled.div`
  margin: 1rem 0 1.5rem 0;
`;

const SpecificForms = styled.div`
  ${AnimationSlideLeft};
  margin-top: 2.5rem;
`;
