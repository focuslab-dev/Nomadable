import React, { useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { apiFetchUserWithStats } from "../../redux/slices/api/apiUserSlice";
import {
  closeModalGlobal,
  selectVisibleModal,
} from "../../redux/slices/uiSlice";
import {
  initUserWithStats,
  selectUserWithStats,
} from "../../redux/slices/userSlice";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { AccountContents } from "../account/AccountContents";
import { Modal } from "../commons/Modal";

interface Props {}

export const UserInfoModal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const visibleModal = useAppSelector(selectVisibleModal);
  const userWithStats = useAppSelector(selectUserWithStats);

  const visible = visibleModal.modalId === cons.MODAL_USER_INFO;
  const userId = visibleModal.referenceId;

  const closeModal = () => {
    console.log("close");
    dispatch(closeModalGlobal());
  };

  useEffect(() => {
    if (visible && userId !== userWithStats._id) {
      dispatch(initUserWithStats());
      dispatch(apiFetchUserWithStats({ userId }));
    } else {
    }
  }, [visible, userId]);

  return (
    <Modal visible={visible} closeModal={closeModal} width="30rem" alignTop>
      <CloseButton onClick={closeModal}>
        <CloseIcon src="/icon/cross-black.png" />
      </CloseButton>
      <AccountContents userWithStats={userWithStats} isMyAccount={false} />
    </Modal>
  );
};

const CloseButton = styled.div`
  ${ClickableStyle}
  position: absolute;
  top: 0.48rem;
  right: 0.6rem;

  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  &:hover {
    background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  }
  z-index: 1;
  /* transition: all 0.2s ease-out; */
`;

const CloseIcon = styled.img`
  width: 0.7rem;
  opacity: 0.6;
`;
