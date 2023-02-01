import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Review, ReviewWithPlaceData } from "../../redux/slices/placeSlice";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { ReviewStars } from "../app-commons/ReviewStars";
import { SectionLoader } from "../commons/SectionLoader";
import { getCity } from "../top-page/search-result/PlaceItem";

interface Props {
  reviews: ReviewWithPlaceData[];
  loading: boolean;
  fetchMore: (loadedCnt: number) => void;
}

export const MyReviews: React.FC<Props> = ({ reviews, fetchMore, loading }) => {
  return (
    <ReviewsSectionWrapper>
      <ReviewItemsWrapper>
        {reviews.map((review) => {
          return (
            <ReviewWrapper key={review._id}>
              <Link href={`/place/${review.placeId}`} passHref>
                <a target="_blank" rel="noopener">
                  <PlaceName>{review.spotName}</PlaceName>
                </a>
              </Link>
              <Address>{getCity(review.spotAddress)}</Address>
              <Stars>
                <ReviewStars stars={review.stars} />
              </Stars>
              <Comment>{review.comment}</Comment>
            </ReviewWrapper>
          );
        })}
      </ReviewItemsWrapper>

      <Footer>
        <SectionLoader visible={loading} />
        <LoadMoreButton onClick={() => fetchMore(reviews.length)}>
          {!loading && "Load More"}
        </LoadMoreButton>
      </Footer>
    </ReviewsSectionWrapper>
  );
};

const ReviewsSectionWrapper = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
`;

const ReviewItemsWrapper = styled.div`
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ReviewWrapper = styled.div`
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.1rem 1rem 1.2rem 1rem;
`;

const PlaceName = styled.div`
  ${ClickableStyle}
  font-weight: bold;
  margin: 0.2rem 0 0.4rem 0;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Address = styled.div`
  ${fs.FontSizeSemiSmall};
  color: ${cons.FONT_COLOR_LIGHT};
`;

const Stars = styled.div`
  font-size: 0.7rem;
  margin: 1rem 0;
`;

const Comment = styled.div`
  ${fs.FontSizeNormal}
  line-height: 1.4em;
`;

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
