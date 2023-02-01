import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { toMonthDate } from "../../modules/DateUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchCheckInHistory,
  selectApiFetchCheckInHistoryStatus,
} from "../../redux/slices/api/apiCheckInSlice";
import {
  CheckInHistoryItem,
  selectCheckInHistory,
} from "../../redux/slices/checkInSlice";
import { ButtonText } from "../../styles/styled-components/Buttons";
import {
  FontSizeSemiSmall,
  FontSizeSmall,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import {
  Header1,
  Header2,
  Header3,
  Header4,
} from "../../styles/styled-components/Texts";
import { SectionLoader } from "../commons/SectionLoader";
import { CheckInHistory } from "./CheckInHistory";

interface Props {}

export const HistoryContents: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const checkInHistory = useAppSelector(selectCheckInHistory);
  const apiStatus = useAppSelector(selectApiFetchCheckInHistoryStatus);

  const [pageIndex, setPageIndex] = useState(0);

  const onClickLoadMore = () => {
    const newPageIndex = pageIndex + 1;
    dispatch(apiFetchCheckInHistory({ pageIndex: newPageIndex }));
    setPageIndex(newPageIndex);
  };

  /**
   * Use Effect
   */

  useEffect(() => {
    if (apiStatus.status === cons.API_IDLE) {
      dispatch(apiFetchCheckInHistory({ pageIndex }));
    }
  }, [apiStatus.status]);

  /**
   * Render
   */

  return (
    <EventContentsWrapper>
      <BodyWrapper>
        <BodyContainer>
          <CheckInHistory checkInHistory={checkInHistory} />
        </BodyContainer>
      </BodyWrapper>
      <Footer>
        <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
        <LoadMoreButton onClick={onClickLoadMore}>
          {apiStatus.status !== cons.API_LOADING && "Load More"}
        </LoadMoreButton>
      </Footer>
    </EventContentsWrapper>
  );
};

const EventContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  padding-top: 0.5rem;
  padding-bottom: 2rem;
`;

const Footer = styled.div`
  margin-top: 0rem;
  /* border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT}; */

  text-align: center;
  height: 3.5rem;
  position: relative;
`;

const LoadMoreButton = styled.div`
  ${ClickableStyle}
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const BodyContainer = styled.div`
  ${ContainerStyleInside}
`;
