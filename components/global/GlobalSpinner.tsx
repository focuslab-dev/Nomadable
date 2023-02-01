import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { selectSpinner } from "../../redux/slices/uiSlice";
import { PageLoader } from "../commons/PageLoader";

interface Props {}

export const GlobalSpinner: React.FC<Props> = ({}) => {
  const { visible, message } = useAppSelector(selectSpinner);

  return <PageLoader visible={visible} message={message} />;
};
