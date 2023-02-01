import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  lowQualitySrc: string;
  highQualitySrc: string;
  styles?: string;
}

export const ProgressiveImage: React.FC<Props> = ({
  lowQualitySrc,
  highQualitySrc,
  styles,
}) => {
  const [src, setSrc] = useState(lowQualitySrc);

  useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return (
    <ImageElm src={src} alt="" blur={src === lowQualitySrc} styles={styles} />
  );
};

const ImageElm = styled.img<{ blur: boolean; styles: string | undefined }>`
  transition: 1s all ease-out;
  width: 100%;
  height: 100%;

  ${(props) =>
    props.blur &&
    `
    filter: blur(0.3rem);
    opacity: 0.6;
  `};

  ${(props) => props.styles};

  min-height: 100%;
`;
