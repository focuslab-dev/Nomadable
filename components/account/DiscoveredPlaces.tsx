import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { SectionLoader } from "../commons/SectionLoader";
import { PlaceCard } from "../event/PlaceCard";
import { PlaceCardBar } from "./PlaceCardBar";

interface Props {
  places: Place[];
  loading: boolean;
  fetchMore: (loadedCnt: number) => void;
}

export const MyDiscoveredPlaces: React.FC<Props> = ({
  places,
  loading,
  fetchMore,
}) => {
  return (
    <DiscoveredPlacesWrapper>
      <PlaceCardWrapper>
        {places.map((p) => {
          return (
            <PlaceWrapper key={p.id}>
              <PlaceCardBar
                placeId={p.id}
                pictures={p.images}
                name={p.spotName}
                address={p.spotAddress}
              />
            </PlaceWrapper>
          );
        })}
      </PlaceCardWrapper>

      <Footer>
        <SectionLoader visible={loading} />
        <LoadMoreButton onClick={() => fetchMore(places.length)}>
          {!loading && "Load More"}
        </LoadMoreButton>
      </Footer>
    </DiscoveredPlacesWrapper>
  );
};

const DiscoveredPlacesWrapper = styled.div``;

const PlaceCardWrapper = styled.div`
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const PlaceWrapper = styled.div``;

const Footer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

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
