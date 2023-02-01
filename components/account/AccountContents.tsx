import link from "next/link";
import { title } from "process";
import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { removeHttps } from "../../modules/StringConverter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiUpdateUser,
  selectApiUpdateUserStatus,
} from "../../redux/slices/api/apiUserSlice";
import { EditableUser, UserWithStats } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonSecondarySmall } from "../../styles/styled-components/Buttons";
import {
  FontSizeLarge,
  FontSizeNormal,
  FontSizeSemiLarge,
  FontSizeSemiSmall,
} from "../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { PageLoader } from "../commons/PageLoader";
import { SectionLoader } from "../commons/SectionLoader";
import { AccountDetail } from "./AccountDetail";
import { EditProfileModal } from "./EditProfileModal";
import { StatsItems } from "./StatsItems";

interface Props {
  userWithStats: UserWithStats;
  isMyAccount: boolean;
}

export const AccountContents: React.FC<Props> = ({
  userWithStats: {
    _id,
    id,
    picture,
    email,
    name,
    description,
    title,
    link,
    points,
    ranking,
    discovered,
    reviews,
    checkIns,
  },
  isMyAccount,
}) => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiUpdateUserStatus);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const onClickEdit = () => {
    setEditModalVisible(true);
  };

  const onSubmitProfileChange = (
    editableUser: EditableUser,
    base64: string
  ) => {
    dispatch(apiUpdateUser({ editableUser, base64 }));
  };

  const onCloseEditProfileModal = () => {
    setEditModalVisible(false);
  };

  /**
   * Render
   */

  if (!_id)
    return (
      <Wrapper>
        <LoadingBody>
          <SectionLoader visible />
        </LoadingBody>
      </Wrapper>
    );

  return (
    <Wrapper>
      <BasicSecion>
        <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
        <NameAndDescription>
          {isMyAccount && (
            <EditButton onClick={onClickEdit}>
              <EditIcon src="/icon/gear-black.svg" />
              Edit
            </EditButton>
          )}

          <Picture src={picture} />
          <Name>{name}</Name>
          <Id>@{id}</Id>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
          {link && (
            <LinkBio href={link} target="_blank" rel="noopener">
              <LinkIcon src="/icon/link-red.svg" />
              {removeHttps(link)}
            </LinkBio>
          )}
        </NameAndDescription>
        <StatsInfo>
          <StatsItems
            points={points}
            ranking={ranking}
            discovered={discovered}
            checkIns={checkIns}
          />
        </StatsInfo>
      </BasicSecion>
      <DetailSection>
        <AccountDetail
          userId={_id}
          discoveredCnt={discovered}
          reviewCnt={reviews}
        />
      </DetailSection>

      <EditProfileModal
        visible={editModalVisible}
        onSubmit={onSubmitProfileChange}
        closeModal={onCloseEditProfileModal}
        editableUser={{ id, picture, name, description, title, link, email }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  position: relative;
  min-height: 100%;
`;

const EditButton = styled.button`
  ${ButtonSecondarySmall};
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  color: ${cons.FONT_COLOR_LIGHT};
  border: 1px solid #ddd;

  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.8rem;
  min-width: auto;

  ${forMobile(`
    top: 1.8rem;
    right: 0.5rem;
  `)}
`;

const EditIcon = styled.img`
  width: 1rem;
  margin-right: 0.5rem;
  opacity: 0.5;
`;

const BasicSecion = styled.div`
  ${ContainerStyleInside}
  margin-bottom: 3rem;
  position: relative;
`;

const NameAndDescription = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  position: relative;
`;

const Picture = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
  border: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  ${FontSizeLarge};
`;

const Id = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall};
  font-weight: 400;
  margin-top: 0.1rem;
`;

const Title = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
  ${FontSizeSemiSmall};
  margin-top: 1rem;
  /* background-color: ${cons.FONT_COLOR_SUPER_LIGHT}; */
  /* padding: 0.2rem 0.4rem; */
  border-radius: 0.3rem;
  /* display: inline-block; */
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  ${FontSizeNormal};
  margin-top: 0.6rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_SECONDARY};
  margin-bottom: 0.6rem;
  line-height: 1.6em;
  white-space: pre-wrap;
`;

const LinkBio = styled.a`
  font-weight: 500;
`;

const LinkIcon = styled.img`
  width: 0.7rem;
  margin-right: 0.2rem;
`;

const StatsInfo = styled.div``;

const DetailSection = styled.div``;

const LoadingBody = styled.div`
  margin-top: 1rem;
  min-height: 15rem;
  margin-bottom: 1rem;
  position: relative;
`;
