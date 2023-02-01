import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { winddowAlert } from "../../../modules/ClientFunctions";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuthenticated } from "../../../redux/slices/userSlice";
import { ButtonText } from "../../../styles/styled-components/Buttons";
import * as fs from "../../../styles/styled-components/FontSize";
import { AvailabilityVoteModal } from "./availability/AvailabilityVoteModal";

interface Props {
  placeId: string;
  availability: string[];
  placeType: string;
}

export const Availability: React.FC<Props> = ({
  availability,
  placeType,
  placeId,
}) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const onClickEdit = () => {
    if (isAuthenticated) {
      setModalVisible(!modalVisible);
    } else {
      winddowAlert(cons.MSG_NOT_LOGIN);
    }
  };

  return (
    <AvailabilityWrapper>
      <EditButton onClick={onClickEdit}>Edit</EditButton>
      {availability.map((a) => (
        <AvailabilityItem key={a}>
          <ItemIcon>{cons.AVL_ALL_LIST[a].icon}</ItemIcon>
          {cons.AVL_ALL_LIST[a].text}
        </AvailabilityItem>
      ))}

      <AvailabilityVoteModal
        visible={modalVisible}
        placeId={placeId}
        placeType={placeType}
        availability={availability}
        closeModal={closeModal}
      />
    </AvailabilityWrapper>
  );
};

const AvailabilityWrapper = styled.div`
  margin-top: 1.8rem;
  display: flex;
  gap: 1.4rem;
  position: relative;
`;

const AvailabilityItem = styled.span`
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding: 0.7rem 1.5rem;
  ${fs.FontSizeSemiSmall}
  font-weight: 600;
  border-radius: 0.3rem;
  color: ${cons.FONT_COLOR_NORMAL};
  display: inline-flex;
  align-items: center;
`;

const ItemIcon = styled.span`
  margin-right: 0.8rem;
  margin-left: -0.5rem;
  font-size: 1.2em;
`;

const EditButton = styled.button`
  ${ButtonText};
  text-decoration: underline;
  position: absolute;
  top: -3.2rem;
  left: 7.5rem;
`;
