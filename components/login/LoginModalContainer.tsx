import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { MODAL_LOGIN } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectVisibleModal,
  updateVisibleModal,
} from "../../redux/slices/uiSlice";
import { LoginModal } from "./LoginModal";

interface Props {}

export const LoginModalContainer: React.FC<Props> = ({}) => {
  const visibleModal = useAppSelector(selectVisibleModal);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(updateVisibleModal({ id: "" }));
  };

  return (
    <LoginModal
      visible={visibleModal.modalId === MODAL_LOGIN}
      closeModal={closeModal}
    />
  );
};
