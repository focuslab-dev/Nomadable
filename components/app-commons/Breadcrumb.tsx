import Link from "next/link";
import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

export interface Breadcrumb {
  text: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumb: React.FC<Props> = ({ breadcrumbs }) => {
  return (
    <BreadcrumbWrapper>
      <Link href="/" passHref>
        <ItemLink>Home</ItemLink>
      </Link>
      {breadcrumbs.map((item, index) => {
        if (index + 1 < breadcrumbs.length) {
          return (
            <Fragment key={item.url}>
              <Divider>{`>`}</Divider>
              <Link href={item.url}>
                <ItemLink>{item.text}</ItemLink>
              </Link>
            </Fragment>
          );
        }
        return (
          <Fragment key={item.url}>
            <Divider>{`>`}</Divider>
            <ItemDiv>{item.text}</ItemDiv>
          </Fragment>
        );
      })}
    </BreadcrumbWrapper>
  );
};

const BreadcrumbWrapper = styled.div`
  padding-top: 7rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${cons.FONT_COLOR_LIGHT};
  flex-wrap: wrap;
`;

const ItemLink = styled.a`
  color: ${cons.FONT_COLOR_LIGHT};
  ${ClickableStyle}
`;

const Divider = styled.div`
  margin: 0 0.5rem;
  color: ${cons.FONT_COLOR_LIGHTEST};
`;

const ItemDiv = styled.div`
  color: ${cons.FONT_COLOR_SECONDARY};
`;
