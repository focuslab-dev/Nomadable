import { useRouter } from "next/router";
import React, { Fragment } from "react";
import styled from "styled-components";
// import { doLogoutUser } from "../../redux/actions/userAction";
import { useAppDispatch } from "../../redux/hooks";
import {
  DropDownIconStyle,
  DropDownItemStyle,
  DropdownWindowStyle,
} from "../../styles/styled-components/Dropdown";
import * as cons from "../../constants";
import Link from "next/link";
import { removeCookie } from "../../modules/CookieHandler";
import { updateUser, initialUser } from "../../redux/slices/userSlice";
import {
  initApiFetchUserState,
  initLoginUserState,
} from "../../redux/slices/api/apiUserSlice";
import { updateVisibleModal } from "../../redux/slices/uiSlice";
import { NotificationMarkCss } from "../../styles/styled-components/UIs";
import { forMobile } from "../../styles/Responsive";

interface Props {
  visible: boolean;
  authenticated: boolean | undefined;
  hideDropdown: () => void;
  notificaitonExist: boolean;
}

export const MenuDropdown: React.FC<Props> = ({
  visible,
  authenticated,
  hideDropdown,
  notificaitonExist,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToPage = (pathname: string) => {
    hideDropdown();
    router.replace(pathname);
  };

  const onClickLogin = () => {
    hideDropdown();
    dispatch(updateVisibleModal({ id: cons.MODAL_LOGIN }));
  };

  const onClickLogout = () => {
    hideDropdown();
    removeCookie(cons.COOKIE_ACCESS_TOKEN, "/");
    dispatch(updateUser({ user: initialUser }));
    dispatch(initApiFetchUserState());
    dispatch(initLoginUserState());
    window.alert("Logged out");
    window.location.reload();
  };

  const renderDropdownContent = () => {
    if (authenticated) {
      return (
        <Fragment>
          <DropdownItem onClick={() => goToPage("/new-place")} hidePC>
            <ItemIcon src="/icon/plus-black2.svg" />
            New Place
          </DropdownItem>
          <DropdownItem onClick={() => goToPage(cons.PATH_HOME)}>
            <ItemIcon src="/icon/map-black.svg" />
            Home
          </DropdownItem>
          <DropdownItem onClick={() => goToPage(cons.PATH_CITIES)}>
            <ItemIcon src="/icon/city-black.svg" />
            Cities
          </DropdownItem>
          <DropdownItem onClick={() => goToPage(cons.PATH_ARTICLES)}>
            <ItemIcon src="/icon/article-black.svg" />
            Articles
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/notification")}>
            <ItemIcon src="/icon/bell-black.svg" /> Notification
            <NotificationMark visible={notificaitonExist} />
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/community")}>
            <ItemIcon src="/icon/group-black.svg" /> Community
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/profile")}>
            <ItemIcon src="/icon/user-black.svg" /> Profile
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/checkins")}>
            <ItemIcon src="/icon/history-black.svg" /> Check-ins
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/setting")}>
            <ItemIcon src="/icon/gear-black.svg" /> Setting
          </DropdownItem>
          <DropdownItem onClick={onClickLogout}>
            <ItemIcon src="/icon/logout-black3.svg" />
            Log Out
          </DropdownItem>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <DropdownItem onClick={() => goToPage(cons.PATH_HOME)}>
          <ItemIcon src="/icon/map-black.svg" />
          Home
        </DropdownItem>
        <DropdownItem onClick={() => goToPage(cons.PATH_CITIES)}>
          <ItemIcon src="/icon/city-black.svg" />
          Cities
        </DropdownItem>
        <DropdownItem onClick={() => goToPage(cons.PATH_ARTICLES)}>
          <ItemIcon src="/icon/article-black.svg" />
          Articles
        </DropdownItem>
        <DropdownItem onClick={onClickLogin}>
          <ItemIcon src="/icon/login-skeleton.svg" />
          Log In
        </DropdownItem>
        <DropdownItem onClick={() => goToPage("/signup")}>
          <ItemIcon src="/icon/signup-skeleton.svg" />
          Sign Up
        </DropdownItem>
      </Fragment>
    );
  };

  return (
    <MenuDropdownWrapper visible={visible} width={"13rem"}>
      {renderDropdownContent()}
    </MenuDropdownWrapper>
  );
};

const MenuDropdownWrapper = styled.div`
  ${DropdownWindowStyle};
`;

const DropdownItem = styled.div<{ hidePC?: boolean }>`
  ${DropDownItemStyle};
  position: relative;

  ${(props) =>
    props.hidePC &&
    `
    display: none;
    ${forMobile(`
      display: block;
    `)}
  `}
`;

const ItemIcon = styled.img`
  ${DropDownIconStyle}
`;

const NotificationMark = styled.div`
  ${NotificationMarkCss};
  right: 3rem;
  top: 1rem;
  height: 0.7rem;
  width: 0.7rem;
`;
