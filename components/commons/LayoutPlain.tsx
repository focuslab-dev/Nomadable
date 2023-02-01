import Link from "next/link";
import React, { ReactNode, useRef, useState } from "react";
import styled from "styled-components";
import {
  CONTAINER_WIDTH_NARROW,
  CONTAINER_WIDTH_WIDE,
  FONT_COLOR_LIGHT,
  FONT_COLOR_LIGHTEST,
} from "../../constants";
import { useClickOutsideEffect } from "../../modules/hooks/useClickOutsideEffect";
import { User } from "../../redux/slices/userSlice";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {
  children: ReactNode;
}

export const LayoutPlain: React.FC<Props> = ({ children }) => {
  const wrapperRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  useClickOutsideEffect(wrapperRef, hideDropdown);

  return (
    <PageWrapper>
      <HeaderWrapper>
        <PageContainer width={CONTAINER_WIDTH_WIDE}>
          <Link href="/">
            <Brandlogo src="/img/brand/brandlogo.svg" />
          </Link>
        </PageContainer>
      </HeaderWrapper>
      {/* <PageContainer width={CONTAINER_WIDTH_NARROW}>{children}</PageContainer> */}
      {children}
    </PageWrapper>
  );
};

const PageWrapper = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${FONT_COLOR_LIGHTEST};
  height: 5rem;
  box-sizing: border-box;
`;

const PageContainer = styled.div`
  ${ContainerStyle}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brandlogo = styled.img`
  ${ClickableStyle}
  width: 8rem;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const Menu = styled.div`
  ${ClickableStyle}

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 4rem;
  border: 1px solid ${FONT_COLOR_LIGHTEST};
  border-radius: 5rem;
  padding: 0.4rem 0rem 0.4rem 0.4rem;
`;

const MenuIcon = styled.img`
  width: 0.8rem;
  opacity: 0.9;
  margin-right: 0.1rem;
`;

const UserIcon = styled.img`
  width: 1.7rem;
`;
