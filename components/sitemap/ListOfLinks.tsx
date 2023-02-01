import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  links: { url: string; text: string }[];
}

export const ListOfLinks: React.FC<Props> = ({ links }) => {
  return (
    <ListOfLinksWrapper>
      {links.map((link, index) => {
        return (
          <LinkWrapper key={index}>
            <Link href={link.url} passHref>
              <a>{link.text}</a>
            </Link>
          </LinkWrapper>
        );
      })}
    </ListOfLinksWrapper>
  );
};

const ListOfLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;

  ${forMobile(`
    gap: 1em;
  `)}
`;

const LinkWrapper = styled.div`
  width: calc(25% - 1.5rem);
  ${fs.FontSizeSemiSmall}
  & a {
    color: ${cons.FONT_COLOR_SECONDARY};
    font-weight: 500;
    text-decoration: underline;
  }

  ${forMobile(`
    width: 100%;
  `)}
`;
