import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import { CardBoaderCss } from "../../styles/styled-components/Card";
import * as fs from "../../styles/styled-components/FontSize";
import { Header3, Header4 } from "../../styles/styled-components/Texts";

interface Props {
  image: string;
  title: string;
}

export const CardWithImage: React.FC<Props> = ({ image, title }) => {
  return (
    <Card>
      <HeadImage src={image} />
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Card>
  );
};

const Card = styled.div`
  ${CardBoaderCss};
  border-radius: 0.7rem;
  overflow: hidden;
  width: 16rem;
  height: 18rem;

  ${forMobile(`
    width: 100%;
    min-height: 14rem;
    height: auto;
  `)}
`;

const HeadImage = styled.img`
  height: 10rem;
  width: 100%;

  ${forMobile(`
    height: 7rem;
  `)}
`;

const TitleWrapper = styled.div`
  padding: 1rem 1rem 1.5rem 1rem;
  ${forMobile(`
    padding: 0.5rem 0.8rem 1rem 0.8rem;
  `)}
`;

const Title = styled.div`
  ${Header3};

  ${forMobile(`
    ${Header4}
  `)}
`;
