import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { convertImgElmsToBase64s } from "../../modules/ImageUtils";
import {
  validateName,
  validateUrl,
  validateUserId,
} from "../../modules/StringValidator";

import { useAppSelector } from "../../redux/hooks";
import { selectApiUpdateUserStatus } from "../../redux/slices/api/apiUserSlice";
import { EditableUser } from "../../redux/slices/userSlice";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { FormSet } from "../app-commons/FormSet";
import { Modal } from "../commons/Modal";
import { ModalHeader } from "../commons/ModalHeader";
import { PageLoader } from "../commons/PageLoader";
import { PhotoUploader } from "../commons/PhotoUploader";
import { SectionLoader } from "../commons/SectionLoader";

interface Props {
  visible: boolean;
  onSubmit: (editableUser: EditableUser, base64: string) => void;
  closeModal: () => void;
  editableUser: EditableUser;
}

export const EditProfileModal: React.FC<Props> = ({
  visible,
  onSubmit,
  closeModal,
  editableUser,
}) => {
  const apiStatus = useAppSelector(selectApiUpdateUserStatus);

  const [newEditableUser, setEditableUser] = useState(editableUser);
  const { id, email, picture, name, title, description, link } =
    newEditableUser;
  const [base64, setBase64] = useState("");

  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgId, setErrorMsgId] = useState("");
  const [errorMsgLink, setErrorMsgLink] = useState("");

  /**
   * Functions
   */

  const canSubmit = () => {
    if (validateName(name)) return false;
    if (validateUserId(id)) return false;
    if (validateUrl(link, false)) return false;
    return true;
  };

  /**
   * User Interface
   */

  const onChangeName = (e: any) => {
    setErrorMsgName(validateName(e.target.value));
    setEditableUser({ ...newEditableUser, name: e.target.value });
  };

  const onChangeUserId = (e: any) => {
    setErrorMsgId(validateUserId(e.target.value));
    setEditableUser({ ...newEditableUser, id: e.target.value });
  };

  const onChangeTitle = (e: any) => {
    const newValue = e.target.value.slice(0, 30);
    setEditableUser({ ...newEditableUser, title: newValue });
  };

  const onChangeDescription = (e: any) => {
    const newDescription = e.target.value.slice(0, 300);
    setEditableUser({ ...newEditableUser, description: newDescription });
  };

  const onChangeLink = (e: any) => {
    setErrorMsgLink(validateUrl(e.target.value, false));
    setEditableUser({ ...newEditableUser, link: e.target.value });
  };

  // const checkInputErrors = () => {
  //   if (name.trim() === "") return "Please input the name.";
  //   if (name.trim() === "") return "Please input the name.";
  //   if (link.length > 0 && !isUrl(link)) return "Link is not valid.";
  //   return false;
  // };

  const onClickSubmit = () => {
    // const errorMessage = checkInputErrors();
    // if (errorMessage) {
    //   setErrorMessage(errorMessage);
    //   return;
    // }
    onSubmit({ id, email, picture, name, title, description, link }, base64);
  };

  const onClickCancel = () => {
    setEditableUser(editableUser);
    closeModal();
  };

  const onUploadImage = (imgElms: HTMLImageElement[]) => {
    setEditableUser({ ...newEditableUser, picture: imgElms[0].src });
    const _base64 = convertImgElmsToBase64s(imgElms[0]);
    setBase64(_base64);
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (apiStatus.status === cons.API_SUCCEEDED) {
      closeModal();
      setEditableUser(editableUser);
    }
  }, [apiStatus.status]);

  /**
   * Render
   */

  return (
    <Modal visible={visible} closeModal={closeModal} width="32rem" alignTop>
      <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
      <ModalHeader title="Edit Profile" onClickClose={closeModal} />
      <ModalBody>
        <PictureWrapper>
          <PhotoUploader multiple={false} onUpload={onUploadImage}>
            <Picture src={picture} />
          </PhotoUploader>
        </PictureWrapper>

        <FormSet
          label="Name*"
          value={name}
          placeholder="User Name"
          onChange={onChangeName}
          width="14rem"
          error={errorMsgName.length > 0}
          errorMessage={errorMsgName}
          small={true}
        />

        <FormSet
          label="User ID*"
          value={id}
          placeholder="user_id"
          onChange={onChangeUserId}
          width="14rem"
          error={errorMsgId.length > 0}
          errorMessage={errorMsgId}
          small={true}
        />

        <FormSet
          label="Occupation"
          value={title}
          placeholder="Web Designer"
          onChange={onChangeTitle}
          width="20rem"
          small={true}
        />

        <FormSet
          label="About"
          value={description}
          placeholder="Tell us about yourself"
          onChange={onChangeDescription}
          textArea
          height="8rem"
          small={true}
        />

        <FormSet
          label="Link"
          value={link}
          placeholder="https://twitter.com/user"
          onChange={onChangeLink}
          error={errorMsgLink.length > 0}
          errorMessage={errorMsgLink}
          small={true}
        />
        {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
      </ModalBody>
      <Footer>
        <CancelButton onClick={onClickCancel}>Cancel</CancelButton>
        <SubmitButton onClick={onClickSubmit} disabled={!canSubmit()}>
          Save
        </SubmitButton>
      </Footer>
    </Modal>
  );
};

const ModalBody = styled.div`
  ${ContainerStyleInside};
  margin-top: 2.5rem;
`;

const PictureWrapper = styled.div`
  ${ClickableStyle}
  border: 2px dashed ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 100%;
  margin-bottom: 2rem;
  height: 6rem;
  width: 6rem;
`;

const Picture = styled.img`
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 100%;
`;

const CancelButton = styled.button`
  ${ButtonText}
`;

const SubmitButton = styled.button`
  ${ButtonBlackSmall}
  margin-left: 5rem;
`;

const ErrorMessage = styled.div`
  color: ${cons.COLOR_RED_0};
  font-weight: 400;
  ${FontSizeNormal};
  margin-top: 1.5rem;
`;

const Footer = styled.div`
  ${ContainerStyleInside};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
`;
