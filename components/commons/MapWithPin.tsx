import React, { useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

import * as cons from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { selectMapboxAccessToken } from "../../redux/slices/envSlice";

interface Props {
  mapId: string;
  interactive: boolean;
  lat: number | null;
  lng: number | null;
  withPin: boolean;
}

export const MapWithPin: React.FC<Props> = (props) => {
  const mapId = `mapbox-${props.mapId}`;
  const mapboxAccessToken = useAppSelector(selectMapboxAccessToken);

  /**
   * On Load
   * */
  const loadMapBox = (
    lat: number | null,
    lng: number | null,
    interactive: boolean,
    _mapboxAccessToken: string
  ) => {
    mapboxgl.accessToken = _mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: mapId,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng || 0, lat || 0],
      zoom: lng ? 10 : 0.1,
      interactive,
    });

    // Create a default Marker and add it to the mapbox.
    if (lng && lat && props.withPin) {
      const marker1 = new mapboxgl.Marker({ color: "black" })
        .setLngLat([lng, lat])
        .addTo(map);
    }
  };

  useEffect(() => {
    const { lat, lng, interactive } = props;
    if (mapboxAccessToken === "") return;

    loadMapBox(lat, lng, interactive, mapboxAccessToken);
  }, [props.lat, props.lng, props.interactive, mapboxAccessToken]);

  return <Map id={mapId} />;
};

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
