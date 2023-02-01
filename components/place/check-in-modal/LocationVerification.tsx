import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCurrentLocation,
  getDistanceFromLatLngInKm,
} from "../../../modules/Location";
import {
  ButtonBlackSmall,
  ButtonPrimarySmall,
} from "../../../styles/styled-components/Buttons";
import { MapWithPin } from "../../commons/MapWithPin";
import { SectionLoader } from "../../commons/SectionLoader";
import { Description, Footer, Title } from "./CheckInModalStyles";

interface Props {
  onVerified: () => void;
  spotLat: number;
  spotLng: number;
}

export const LocationVerification: React.FC<Props> = (props) => {
  const router = useRouter();
  const [requestingLocation, setRequestingLocation] = useState(false);
  const [latLng, setLatLng] = useState<undefined | [lat: number, lng: number]>(
    undefined
  );

  /**
   * User Interface
   */

  const onClickVerify = async () => {
    try {
      setRequestingLocation(true);

      let succeed = undefined;
      let location;

      while (succeed === undefined) {
        try {
          location = await getCurrentLocation({
            accurate: true,
            useCache: false,
          });
          succeed = true;
        } catch (err: any) {
          if (err.code !== 3) {
            succeed = false;
          }
        }
      }

      if (!location) {
        throw Error;
      }

      setLatLng([location.lat, location.lng]);

      const distanceKm = getDistanceFromLatLngInKm(
        props.spotLat,
        props.spotLng,
        location.lat,
        location.lng
      );

      if (distanceKm > 0.5) {
        throw "The location is not correct. Please check if you are actually inside the place.";
      }

      // location verified
      props.onVerified();
      setRequestingLocation(false);
    } catch (error: any) {
      setRequestingLocation(false);
      window.alert(
        error ||
          "Something went wrong. If you are using VPN, please turn it off and try again. If the problem pursists, please contact support."
      );
    }
  };

  useEffect(() => {
    if (router.query && router.query.checkin === "true") {
      onClickVerify();

      // remove query params
      // router.push(
      //   {
      //     pathname: `/place/${router.query.placeId}`,
      //     query: {},
      //   },
      //   undefined,
      //   { shallow: true }
      // );
    }
  }, [router.query]);

  /**
   * Render
   */

  return (
    <Wrapper>
      <Title>Please Verify Your Location</Title>

      <Description>
        The browser will request your location information. Please allow it to
        proceed. (The information will only be used one time and will be
        discarded immediately)
      </Description>

      <MapWrapper>
        <SectionLoader visible={requestingLocation} />
        <MapWithPin
          lat={props.spotLat}
          lng={props.spotLng}
          interactive={false}
          mapId="location-verification"
          withPin
        />
      </MapWrapper>
      <Footer>
        <ButtonVerify onClick={onClickVerify} disabled={requestingLocation}>
          {requestingLocation ? "Verifiying..." : "Verify"}
        </ButtonVerify>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const MapWrapper = styled.div`
  height: 14rem;
  border-radius: 0.3rem;
  overflow: hidden;
  position: relative;
`;

const ButtonVerify = styled.button`
  ${ButtonPrimarySmall};
  width: 100%;
`;

const ButtonNext = styled.button`
  ${ButtonBlackSmall};
  width: 100%;
`;
