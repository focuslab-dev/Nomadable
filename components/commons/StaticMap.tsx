import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import mapboxAccessToken from "../../pages/api/mapbox-access-token";
import { useAppSelector } from "../../redux/hooks";
import { selectMapboxAccessToken } from "../../redux/slices/envSlice";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
}

const BASE_URL = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/`;

export const StaticMap: React.FC<Props> = (props) => {
  const mapboxAccessToken = useAppSelector(selectMapboxAccessToken);

  return (
    <StaticMapWrapper>
      <MapImage
        src={`${BASE_URL}${props.lng},${props.lat},${props.zoom || 11},0/${
          props.width || 600
        }x${props.height || 600}?access_token=${mapboxAccessToken}`}
      />
    </StaticMapWrapper>
  );
};

const StaticMapWrapper = styled.div``;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
