import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { useAppDispatch } from "../../../redux/hooks";
import { updateVisibleModal } from "../../../redux/slices/uiSlice";
import * as fs from "../../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";

interface Props {
  userId: string;
  userName: string;
  userTitle: string;
  userPicture: string;
}

export const DiscoveredBy: React.FC<Props> = ({
  userId,
  userName,
  userTitle,
  userPicture,
}) => {
  const dispatch = useAppDispatch();

  const onClickUser = () => {
    dispatch(
      updateVisibleModal({ id: cons.MODAL_USER_INFO, referenceId: userId })
    );
  };

  return (
    <DiscoveredByWrapper onClick={onClickUser}>
      <Label>Discovered by</Label>
      <UserInfo>
        <UserPicture src={userPicture} />
        <NameAndDescription>
          <Name>{userName}</Name>
          <Description>{userTitle}</Description>
        </NameAndDescription>
      </UserInfo>
    </DiscoveredByWrapper>
  );
};

const DiscoveredByWrapper = styled.div`
  ${ClickableStyle};
  display: inline-block;
`;

const Label = styled.div`
  ${fs.FontSizeSemiSmall};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const UserInfo = styled.div`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
`;

const UserPicture = styled.img`
  width: 2.6rem;
  border-radius: 100%;
`;

const NameAndDescription = styled.div`
  margin-left: 0.8rem;
`;

const Name = styled.div`
  ${fs.FontSizeNormal};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Description = styled.div`
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
  margin-top: 0.1rem;
`;
