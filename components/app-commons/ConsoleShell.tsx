import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useViewHeight } from "../../modules/hooks/useViewHeight";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchContributers,
  apiFetchContributersArea,
  selectApiFetchUserStatus,
} from "../../redux/slices/api/apiUserSlice";
import {
  selectContributers,
  selectContributersArea,
} from "../../redux/slices/contributerSlice";
import { selectAuthenticated } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import {
  FontSizeNormal,
  FontSizeSemiLarge,
  FontSizeSmall,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import {
  ContainerStyle,
  ContainerStyleInside,
} from "../../styles/styled-components/Layouts";
import {
  Header2,
  Header3,
  Header4,
} from "../../styles/styled-components/Texts";
import { Layout } from "../commons/Layout";
import { Contributers } from "../top-page/search-result/Contributers";

interface Props {
  pathname: string;
  children: ReactNode;
  headerLabel: string;
}

export const ConsoleShell: React.FC<Props> = ({
  pathname,
  children,
  headerLabel,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [viewHeight] = useViewHeight();

  const apiStatus = useAppSelector(selectApiFetchUserStatus);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const contributers = useAppSelector(selectContributers);

  const fetchContributers = () => {
    dispatch(apiFetchContributers({ maxCnt: 10 }));
  };

  useEffect(() => {
    if (
      [cons.API_SUCCEEDED, cons.API_FALIED].includes(apiStatus.status) &&
      !isAuthenticated
    ) {
      router.push("/");
    }
  }, [apiStatus, isAuthenticated]);

  useEffect(() => {
    if (contributers.length === 0) {
      fetchContributers();
    }
  }, [contributers]);

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_NORMAL}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
      fixed
    >
      <FlexWrapper>
        <LeftSection>
          <Navigation>
            <Link href="/community">
              <NavItem active={pathname === "/community"}>
                <NavIcon src="/icon/group-black.svg" />
                Community
              </NavItem>
            </Link>
            <Link href="/notification">
              <NavItem active={pathname === "/notification"}>
                <NavIcon src="/icon/bell-black.svg" />
                Notification
              </NavItem>
            </Link>
            <Link href="/profile">
              <NavItem active={pathname === "/profile"}>
                <NavIcon src="/icon/user-black.svg" />
                Profile
              </NavItem>
            </Link>
            <Link href="/checkins">
              <NavItem active={pathname === "/checkins"}>
                <NavIcon src="/icon/history-black.svg" />
                Check-ins
              </NavItem>
            </Link>
            <Link href="/setting">
              <NavItem active={pathname === "/setting"}>
                <NavIcon src="/icon/gear-black.svg" />
                Setting
              </NavItem>
            </Link>
          </Navigation>
          <Card>
            <CardHeader>{headerLabel}</CardHeader>
            {children}
          </Card>
        </LeftSection>
        <RightSection viewHeight={viewHeight}>
          <ContributersWrapper>
            <ContributersTitle>Top Contributers</ContributersTitle>
            <ContributersContainer>
              <Contributers contributers={contributers} />
            </ContributersContainer>
          </ContributersWrapper>
        </RightSection>
      </FlexWrapper>
    </Layout>
  );
};

export const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 9rem;
  padding-bottom: 4rem;

  // media query for ipad
  @media screen and (max-width: ${cons.CONTAINER_WIDTH_NARROW}) {
    /* flex-direction: column; */
  }

  ${forMobile(`
    padding-top: 6.5rem;
    flex-direction: column;
    padding-bottom: 0rem;
  `)}
`;

const LeftSection = styled.div`
  /* width: 100%; */
  width: 72%;
  margin-right: 3rem;
  display: flex;
  align-items: flex-start;
  /* max-width: 52rem; */
  @media screen and (max-width: ${cons.CONTAINER_WIDTH_NARROW}) {
    margin-right: 2rem;
    /* max-width: 100%; */
  }

  ${forMobile(`
  width: 100%;
  `)}
`;

const Navigation = styled.div`
  width: 20rem;
  position: fixed;

  @media screen and (max-width: ${cons.CONTAINER_WIDTH_NARROW}) {
    display: none;
  }

  /* ${forMobile(`
    display:none;
  `)} */
`;

export const RightSection = styled.div<{ viewHeight: number }>`
  width: 28%;
  /* transform: translateY(-2rem); */
  max-width: 21rem;

  position: sticky;
  top: ${(props) => props.viewHeight - 850}px;

  @media screen and (max-width: ${cons.CONTAINER_WIDTH_NARROW}) {
    width: 40%;
  }

  ${forMobile(`
  position: auto;
    width: 100%;
    max-width: 100%;
    margin-top: 2rem;
  `)}
`;

const NavItem = styled.button<{ active: boolean }>`
  ${ClickableStyle}
  background: none;
  display: flex;
  align-items: center;
  border: none;
  ${FontSizeSemiLarge};
  font-weight: 500;
  padding: 0.8rem 1.3rem 0.8rem 1rem;
  border-radius: 10rem;
  margin-bottom: 0.5rem;
  transition: all 0.1s ease-in-out;
  color: rgba(0, 0, 0, 0.5);
  & img {
    opacity: 0.5;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  ${(props) =>
    props.active &&
    `
      color: ${cons.FONT_COLOR_NORMAL};
    font-weight: bold;
    & img {
      opacity: 0.9;
    }
  `};
`;

const NavIcon = styled.img`
  width: 1.6rem;
  margin-right: 1rem;
`;

const Card = styled.div`
  /* width: 50rem; */
  /* min-height: 20rem; */
  background-color: white;
  border-radius: 1rem;
  margin-left: 15rem;
  width: 100%;

  @media screen and (max-width: ${cons.CONTAINER_WIDTH_NARROW}) {
    margin-left: 0;
  }

  ${forMobile(`
    width: 100%;
  `)}
`;

const CardHeader = styled.div`
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
  /* color: ${cons.FONT_COLOR_NORMAL}; */
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSmall}
  text-transform: uppercase;
`;

export const ContributersWrapper = styled.div`
  background-color: white;
  border-radius: 0.9rem;
  /* padding-top: 1rem; */
`;

export const ContributersContainer = styled.div`
  ${ContainerStyleInside}
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
`;

export const ContributersTitle = styled.div`
  text-transform: uppercase;
  ${Header4}
  /* padding-top: 1rem; */
  ${ContainerStyleInside}
  /* padding-bottom: 1rem; */
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  height: 3.2rem;
  display: flex;
  align-items: center;
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSmall}
`;
