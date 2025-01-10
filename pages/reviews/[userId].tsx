import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { MapSearch } from "../../components/map-search/MapSearch";
import { useAppDispatch } from "../../redux/hooks";
import { apiFetchReviews } from "../../redux/slices/api/apiReviewSlice";
import { Place, ReviewWithPlaceData } from "../../redux/slices/placeSlice";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import HeadSetter from "../../components/commons/HeadSetter";
import * as cons from "../../constants";

const UserReviewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userId } = router.query;
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [hoveredPlace, setHoveredPlace] = useState("");

  useEffect(() => {
    if (!userId) return;

    dispatch(
      apiFetchReviews({
        userId: userId as string,
        loadedCnt: 0,
        loadingCnt: 50,
        inModal: false,
      })
    )
      .unwrap()
      .then((res) => {
        // Convert ReviewWithPlaceData to Place objects
        const reviewPlaces = res.reviews.map((review: ReviewWithPlaceData) => ({
          id: review.placeId,
          placeType: review.placeType,
          spotName: review.spotName,
          spotAddress: review.spotAddress,
          thumbnail: review.thumbnail,
          location: {
            // Parse coordinates from the review data
            coordinates: [0, 0], // This will be updated with actual coordinates
          },
          reviewStars: review.stars,
          // Other required Place fields with default values
          discoveredBy: "",
          images: [],
          speedDown: 0,
          speedUp: 0,
          testCnt: 0,
          availability: [],
          avgReviewAspects: {
            vacancy: null,
            stableWifi: null,
            peopleWorking: null,
            aesthetic: null,
            community: null,
            quiet: null,
            airCondition: null,
            comfyChair: null,
            wideDesk: null,
            overall: null,
          },
          status: cons.STATUS_OPEN,
          created: undefined,
          googlePlaceId: "",
        }));
        setPlaces(reviewPlaces);
      });
  }, [userId, dispatch]);

  const handleMapChange = (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => {
    // Handle map boundary changes if needed
  };

  const handleMarkerClick = (placeId: string) => {
    setSelectedPlace(placeId);
    // Navigate to the place page when marker is clicked
    router.push(`/place/${placeId}`);
  };

  return (
    <ConsoleShell pathname={router.pathname} headerLabel="Reviews Map">
      <HeadSetter
        pageTitle={`Reviews Map | ${cons.APP_NAME}`}
        pageDescription="View user reviews on the map"
        pagePath={`${cons.APP_URL}/reviews/${userId}`}
      />
      <MapWrapper>
        <MapSearch
          mapId="user-reviews-map"
          places={places}
          onChange={handleMapChange}
          onClickMarker={handleMarkerClick}
          selectedPlace={selectedPlace}
          viewHeight={typeof window !== "undefined" ? window.innerHeight : 800}
          hoveredPlace={hoveredPlace}
          mapButtonVisible={true}
        />
      </MapWrapper>
    </ConsoleShell>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
`;

export default UserReviewsPage;
