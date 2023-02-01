import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchLatestEvents,
  selectApiFetchLatestEventsStatus,
} from "../../redux/slices/api/apiEventSlice";
import {
  EventWithData,
  selectLatestEvents,
} from "../../redux/slices/eventSlice";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { SectionLoader } from "../commons/SectionLoader";
import { EventItem } from "./EventItem";

interface Props {}

export const EventContents: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const latestEvents = useAppSelector(selectLatestEvents);
  const apiStatus = useAppSelector(selectApiFetchLatestEventsStatus);

  const [pageIndex, setPageIndex] = useState(0);

  const onClickLoadMore = () => {
    const newPageIndex = pageIndex + 1;
    dispatch(apiFetchLatestEvents({ pageIndex: newPageIndex }));
    setPageIndex(newPageIndex);
  };

  useEffect(() => {
    if (apiStatus.status === cons.API_IDLE) {
      dispatch(apiFetchLatestEvents({ pageIndex }));
    }
  }, [apiStatus.status]);

  return (
    <EventContentsWrapper>
      <BodyWrapper>
        <EventsWrapper>
          {latestEvents.map((evt) => {
            return <EventItem key={evt.timestamp} eventWithData={evt} />;
          })}
        </EventsWrapper>
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
`;

const EventsWrapper = styled.div``;

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
