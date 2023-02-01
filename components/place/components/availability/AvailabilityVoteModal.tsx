import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../../../constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  apiVoteAvailability,
  selectApiVoteAvailabilityStatus,
} from "../../../../redux/slices/api/apiPlaceSlice";
import { ButtonBlackSmall } from "../../../../styles/styled-components/Buttons";
import * as fs from "../../../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../../../styles/styled-components/Layouts";
import { AvailabilityForm } from "../../../app-commons/AvailabilityForm";
import { Modal } from "../../../commons/Modal";
import { ModalHeader } from "../../../commons/ModalHeader";
import { PageLoader } from "../../../commons/PageLoader";

interface Props {
  visible: boolean;
  placeId: string;
  placeType: string;
  availability: string[];
  closeModal: () => void;
}

export const AvailabilityVoteModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiVoteAvailabilityStatus);
  const [placeType, setPlaceType] = useState(props.placeType);
  const [availability, setAvailability] = useState(props.availability);

  const onChangePlaceType = (placeType: string) => {
    setPlaceType(placeType);
    setAvailability([]);
  };

  const onClickSwitch = (item: string) => {
    if (availability.includes(item)) {
      setAvailability(availability.filter((avl) => avl !== item));
    } else {
      setAvailability([...availability, item]);
    }
  };

  const onClickSubmit = () => {
    dispatch(
      apiVoteAvailability({
        placeId: props.placeId,
        vote: { placeType, availability },
      })
    );
  };

  return (
    <Modal visible={props.visible} width="30rem" closeModal={props.closeModal}>
      <PageLoader
        visible={apiStatus.status === cons.API_LOADING}
        message="Submitting..."
      />
      <ModalHeader title="Edit Basic Info" onClickClose={props.closeModal} />
      <BodyWrapper>
        <AvailabilityForm
          placeType={placeType}
          availability={availability}
          onChangePlaceType={onChangePlaceType}
          onClickSwitch={onClickSwitch}
        />{" "}
        <Message>*The information will be determined by majority vote.</Message>
      </BodyWrapper>
      <Footer>
        <SubmitButton
          type="button"
          onClick={onClickSubmit}
          disabled={apiStatus.status === cons.API_LOADING}
        >
          Submit
        </SubmitButton>
      </Footer>
    </Modal>
  );
};

const BodyWrapper = styled.div`
  ${ContainerStyleInside};
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const Message = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${ContainerStyleInside};
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const SubmitButton = styled.button`
  ${ButtonBlackSmall};
`;
