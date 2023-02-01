import image from "next/image";
import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import updateImages from "../../../pages/api/update-images";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { apiUpdateImages } from "../../../redux/slices/api/apiPlaceSlice";
import { selectUser } from "../../../redux/slices/userSlice";
import { forMobile } from "../../../styles/Responsive";
import { ButtonText } from "../../../styles/styled-components/Buttons";
import { HideScrollBarCss } from "../../../styles/styled-components/StyleUtils";

interface Props {
  images: string[];
}

export const SpotImages: React.FC<Props> = ({ images }) => {
  return (
    <SpotImagesWrapper>
      <Scroller>
        <LargeImageSection>
          <LargeImage src={images[0]} />
        </LargeImageSection>
        <SmallImageSection>
          {images
            .slice(1, images.length)
            .map((image: string, index: number) => {
              return (
                <SmallImage
                  key={image}
                  src={image}
                  lastItem={index + 2 === images.length}
                />
              );
            })}
        </SmallImageSection>
      </Scroller>
    </SpotImagesWrapper>
  );
};

const FLEX_GAP = 0.4;

const SpotImagesWrapper = styled.div`
  height: 28rem;
  border-radius: 0.8rem;
  overflow: hidden;

  ${forMobile(`
    height: 14rem;
    overflow-x: scroll;
    ${HideScrollBarCss}
  `)}
`;

const Scroller = styled.div`
  height: 100%;
  display: flex;
  gap: ${FLEX_GAP}rem;
  width: 100%;
  position: relative;

  ${forMobile(`
    width: 180%;
  `)}
`;

const LargeImageSection = styled.div`
  width: calc(50% - ${FLEX_GAP}rem);

  ${forMobile(`
    width: 100%;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
`)}
`;

const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${forMobile(`
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
`)}
`;

const SmallImageSection = styled.div`
  width: calc(50%);
  display: flex;
  flex-wrap: wrap;
  gap: ${FLEX_GAP}rem;

  ${forMobile(`
    width: 100%;
    flex-wrap: nowrap;
  `)}
`;

const SmallImage = styled.img<{ lastItem: boolean }>`
  width: calc(50% - ${FLEX_GAP / 2}rem);
  object-fit: cover;
  height: 50%;

  ${(props) =>
    props.lastItem &&
    `
  ${forMobile(`
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  `)}

`};

  ${forMobile(`
    width: 100%;
    height: 100%;
  `)}
`;
