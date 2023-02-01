import React, { createElement, ReactNode, useRef } from "react";
import styled from "styled-components";

import {
  convertImageFilesToElements,
  getFilesFromDropEvent,
} from "../../modules/ImageUtils";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  multiple: boolean;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onUploadStart?: () => void;
  onUpload: (imgElms: HTMLImageElement[]) => void;
  children: ReactNode;
}

export const PhotoUploader: React.FC<Props> = ({
  children,
  multiple,
  onDragEnter,
  onDragLeave,
  onUploadStart,
  onUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const returnImageElements = async (files: File[]) => {
    const imgElms = await convertImageFilesToElements(files);
    onUpload(imgElms);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDragFiles = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (onUploadStart) onUploadStart();
    const files = getFilesFromDropEvent(e);
    returnImageElements(files);
  };

  const onChangeFileInput = (e: any) => {
    console.log("up");
    e.preventDefault();
    if (onUploadStart) onUploadStart();
    const files = e.target.files;
    returnImageElements(files);
  };

  return (
    <PhotoUploaderWrapper
      onClick={() => {
        if (fileInputRef && fileInputRef.current) {
          fileInputRef.current.click();
        }
      }}
      onDragOver={onDragOver}
      onDrop={onDragFiles}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <Container>
        {children}
        <FileInput
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={onChangeFileInput}
          accept="image/*"
          multiple={multiple}
        />
      </Container>
    </PhotoUploaderWrapper>
  );
};

const PhotoUploaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${ClickableStyle};
`;

const FileInput = styled.input``;

const Container = styled.div`
  pointer-events: none;
  height: 100%;
  width: 100%;
`;
