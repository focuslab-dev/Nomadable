import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { callFetchNearbyPlaces } from "../../calls/placeCalls";

import * as cons from "../../constants";
import { getCurrentLocation } from "../../modules/Location";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PlaceHeader } from "../../redux/slices/placeSlice";
import { forMobile } from "../../styles/Responsive";
import {
  ButtonPrimarySmall,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { Modal } from "../commons/Modal";
import { ModalHeader } from "../commons/ModalHeader";
import { SectionLoader } from "../commons/SectionLoader";
import {
  selectVisibleModal,
  updateVisibleModal,
} from "../../redux/slices/uiSlice";

interface Props {}

export const FastCheckInModal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceHeader[]>([]);
  const visible =
    useAppSelector(selectVisibleModal).modalId === cons.MODAL_FAST_CHECKIN;

  /**
   * Functions
   */

  const showPlaceOptions = async () => {
    setLoading(true);
    setPlaces([]);

    let _placeHeaders: PlaceHeader[] = [];

    try {
      const location = await getCurrentLocation({
        accurate: true,
        useCache: false,
      });
      if (!location) throw Error;

      const { places } = await callFetchNearbyPlaces({
        userLat: location.lat,
        userLng: location.lng,
        maxDistance: 1000,
        maxPlaces: 5,
      });
      _placeHeaders = places;
    } catch (err) {
      _placeHeaders = [];
      window.alert(
        "Something went wrong. If you are using VPN, please disable it."
      );
    }

    setLoading(false);

    // get nearby spots

    setPlaces(_placeHeaders);
  };

  /**
   * User Interface
   */

  const handleCloseModal = () => {
    dispatch(updateVisibleModal({ id: "" }));
  };

  const openPlacePageWithCheckIn = (placeId: string) => {
    // window.open(`${cons.APP_URL}/place/${placeId}?checkin=true`, "_blank");
    handleCloseModal();
    router.push(`/place/${placeId}?checkin=true`);
  };

  const onClickNewPlace = () => {
    handleCloseModal();
    router.push(cons.PATH_NEW_PLACE);
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (visible) {
      showPlaceOptions();
    }
  }, [visible]);

  return (
    <Modal visible={visible} closeModal={handleCloseModal} width="28rem">
      <ModalHeader title="Checking in to..." onClickClose={handleCloseModal} />
      <ModalBody>
        <SectionLoader visible={loading} />
        <PlaceOptions>
          {places.map((place) => {
            return (
              <PlaceItem
                key={place.id}
                onClick={() => openPlacePageWithCheckIn(place.id)}
              >
                <PinIcon src="/icon/pin-black.png" />
                <PlaceInfo>
                  <PlaceName>{place.spotName}</PlaceName>
                  <PlaceDistance>
                    {place.distance
                      ? Math.round(place.distance / 100) / 10
                      : "--"}{" "}
                    km
                  </PlaceDistance>
                </PlaceInfo>
              </PlaceItem>
            );
          })}
        </PlaceOptions>
      </ModalBody>
      <ModalFooter>
        No result?
        {/* <Link href={cons.PATH_NEW_PLACE}> */}
        <NewPlaceButton onClick={onClickNewPlace}>
          + Add New Place
        </NewPlaceButton>
        {/* </Link> */}
      </ModalFooter>
    </Modal>
  );
};

export const Button = styled.button`
  ${ButtonPrimarySmall}
  background-color: ${cons.COLOR_PRIMARY_1};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50rem;
  padding-left: 1.5rem;
  padding-right: 1.6rem;
  box-shadow: ${cons.SHADOW_2};

  ${forMobile(`
      width: 3.3rem;
      min-width: 3.3rem;
      height: 3.3rem;
      justify-content: center;
      padding: 0;

      & span {
        display: none;
      }

      & img {
        margin-right: 0;
        width: 1.3rem;
        height: 1.3rem;
      }
  `)}
`;

export const Icon = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.5rem;
`;

export const ModalBody = styled.div`
  padding: 0.5rem 0;
  min-height: 3rem;
`;
export const PlaceOptions = styled.div``;

export const PlaceItem = styled.div`
  ${ClickableStyle};
  ${ContainerStyleInside};
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  align-items: flex-start;

  &:hover {
    background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  }
`;

export const PinIcon = styled.img`
  width: 1rem;
  opacity: 0.4;
  transform: translateY(0.52rem);
  margin-right: 0.7rem;
`;

export const PlaceInfo = styled.div``;

export const PlaceName = styled.div`
  ${fs.FontSizeNormal}
  font-weight: 600;
  color: ${cons.FONT_COLOR_NORMAL};
`;
export const PlaceDistance = styled.div`
  margin-top: 0.1rem;
  color: ${cons.FONT_COLOR_LIGHTEST};
  ${fs.FontSizeSemiSmall};
  font-weight: 500;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};
`;

export const NewPlaceButton = styled.button`
  ${ButtonText};
  text-decoration: underline;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-left: 0.5rem;
`;
