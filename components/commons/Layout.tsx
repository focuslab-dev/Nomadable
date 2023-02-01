import React, { ReactNode } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

import { selectAuthenticated, selectUser } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import { Footer } from "../global/Footer";
import { Header } from "../header/Header";

interface Props {
  width: string;
  children: ReactNode;
  bgColor?: string;
  fixed?: boolean;
}

const FOOTER_HEIGHT = "3.5rem";

export const Layout: React.FC<Props> = ({
  width,
  children,
  bgColor,
  fixed,
}) => {
  const authenticated = useAppSelector(selectAuthenticated);
  const user = useAppSelector(selectUser);

  return (
    <PageWrapper bgColor={bgColor}>
      <Header
        user={user}
        width={width}
        authenticated={authenticated}
        fixed={fixed}
      />
      <PageContainer width={width}>{children}</PageContainer>
      <Footer width={width} height={FOOTER_HEIGHT} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor};
  /* min-height: 100vh; */

  ${forMobile(`
    // width: calc(100% - 2rem);
  `)}
`;

const PageContainer = styled.div`
  ${ContainerStyle}
  ${forMobile(`
      padding-left: 0.7rem;
      padding-right: 0.7rem;
  `)}
  min-height: calc(100vh - ${FOOTER_HEIGHT});
`;
