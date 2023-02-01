import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as fs from "../../styles/styled-components/FontSize";
import {
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_NORMAL,
  FONT_COLOR_SUPER_LIGHT,
} from "../../constants";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {
  width: string;
  height: string;
}

export const Footer: React.FC<Props> = ({ width, height }) => {
  return (
    <FooterWrapper height={height}>
      <PageContainer width={width}>
        <FooterContents>
          <Trademark>{`© ${new Date().getFullYear()} Nomadable`}</Trademark>
          <Dot>&#x2022;</Dot>
          <Link href="/about" passHref>
            <a>About</a>
          </Link>
          <Dot>&#x2022;</Dot>
          <Link href="/sitemap" passHref>
            <a>Sitemap</a>
          </Link>
          <Dot>&#x2022;</Dot>
          <Link href="https://twitter.com/NomadableApp" passHref>
            <LinkA target="_blank" rel="noopener noreferrer">
              <SnsIcon src="/icon/twitter-black.svg" />
            </LinkA>
          </Link>
          <Dot>&#x2022;</Dot>
          <Link href="https://facebook.com/NomadableApp" passHref>
            <LinkA target="_blank" rel="noopener noreferrer">
              <SnsIcon src="/icon/facebook-black.svg" />
            </LinkA>
          </Link>
        </FooterContents>
      </PageContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div<{ height: string }>`
  ${(props) => `height: ${props.height};`};
  border-top: 1px solid ${FONT_COLOR_SUPER_LIGHT};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
`;

const PageContainer = styled.div`
  ${ContainerStyle}
`;

const FooterContents = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
  ${fs.FontSizeSemiSmall}

  & a {
    /* text-transform: uppercase; */
    color: ${FONT_COLOR_NORMAL};
  }

  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const Trademark = styled.div`
  /* margin-right: 1rem; */
`;

const Dot = styled.div`
  color: ${FONT_COLOR_LIGHTEST};
  /* margin: 0 0.5rem; */
  display: flex;
  align-items: center;
`;

const SnsIcon = styled.img`
  width: 1.15rem;
  opacity: 0.5;
  margin: 0 0.1rem;
`;

const LinkA = styled.a`
  display: flex;
  align-items: center;
`;
