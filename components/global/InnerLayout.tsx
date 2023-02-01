import Link from "next/link";
import React, { ReactNode } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  breadcrumbs: { path: string; label: string }[];
  pageTitle: string;
  children: ReactNode;
}

export const InnerLayout: React.FC<Props> = ({
  breadcrumbs,
  pageTitle,
  children,
}) => {
  const renderBreadcrumbs = (
    _breadcrumbs: { path: string; label: string }[]
  ) => {
    const elm = [];

    elm.push(
      <BreadcrumbLink>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    );

    _breadcrumbs.forEach((b) => {
      elm.push(<Devider>{`>`}</Devider>);
      elm.push(
        <BreadcrumbLink>
          <Link href={b.path}>{b.label}</Link>
        </BreadcrumbLink>
      );
    });

    elm.push(<Devider>{`>`}</Devider>);
    elm.push(<BreadcrumbLink>{pageTitle}</BreadcrumbLink>);

    return elm;
  };

  return (
    <InnerLayoutWrapper>
      <Breadcrumbs>{renderBreadcrumbs(breadcrumbs)}</Breadcrumbs>
      <Card>{children}</Card>
    </InnerLayoutWrapper>
  );
};

const InnerLayoutWrapper = styled.div`
  margin-top: 3.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.1rem 3rem;
  margin-top: 1rem;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  ${fs.FontSizeSemiSmall};
`;

const BreadcrumbLink = styled.div`
  text-decoration: none;

  font-weight: 500;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Devider = styled.div`
  margin: 0 0.4rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: 500;
`;
