import { PLACE_TYPE_CAFE } from "./../../constants";
import { Place } from "../../redux/slices/placeSlice";
import { PLACE_TYPE_WORKSPACE, PLACE_TYPE_LIST } from "../../constants";
import { getColorOfSpeed } from "../commons/NetSpeedIndicator";
import { getStarValue } from "../place/components/review/ReviewScore";

export interface Pin {
  id: string;
  lat: number;
  lng: number;
  color: string;
  placeType: string;
  name: string;
  reviewStars: number | null;
}

const makeIcon = (props: {
  placeType: string;
  name: string;
  color: string;
  fontSize: number;
  withName: boolean;
  reviewStars: number | null;
}) => {
  return `
      <div style="display:flex; flex-direction: column; align-items: center;">
        <div style="font-size: ${
          props.placeType === PLACE_TYPE_CAFE
            ? props.fontSize * 2.4
            : props.fontSize * 2
        }rem; margin-bottom: ${props.fontSize * 0.2}rem;">${
    PLACE_TYPE_LIST[props.placeType].icon
  }</div>
          <div style="position: absolute; left: 1.3rem; top: -0.1rem; height: 0.6rem; width: 0.6rem; border-radius: 50%; background-color: ${
            props.color
          };"></div>

          ${
            props.withName
              ? `<div style="position: absolute; left: 1.9rem; top: ${
                  props.reviewStars !== null ? "-0.3rem;" : "0rem;"
                }; width: 5rem; font-size: 0.7rem; font-weight: bold; margin-left: 0.3rem;">${props.name.slice(
                  0,
                  10
                )}</div>`
              : ""
          }

          ${
            props.withName && props.reviewStars !== null
              ? `<div style="position: absolute; left: 1.9rem; top: 0.55rem; width: 5rem; font-size: 0.7rem; font-weight: normal; margin-left: 0.3rem;"><img src="${
                  props.reviewStars >= 4.5
                    ? "/icon/star-gold.svg"
                    : "/icon/star-black.svg"
                }" style="width: 0.6rem; margin-right: 0.15rem;" />${getStarValue(
                  props.reviewStars
                )}</div>`
              : ""
          }
      </div>
    `;
};

const convertPlacesToPins = (places: Place[]): Pin[] => {
  return places.map((p) => ({
    id: p.id,
    lat: p.location.coordinates[1],
    lng: p.location.coordinates[0],
    color: getColorOfSpeed(p.speedDown),
    placeType: p.placeType,
    name: p.spotName,
    reviewStars: p.reviewStars || null,
  }));
};

export { makeIcon, convertPlacesToPins };
