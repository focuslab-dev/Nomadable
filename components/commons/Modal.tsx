import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { HideScrollBarCss } from "../../styles/styled-components/StyleUtils";
import * as cons from "../../constants";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import {
  ModalOverlayCss,
  ModalWindowCss,
} from "../../styles/styled-components/ModalStyles";

interface Props {
  visible: boolean;
  width: string;
  closeModal: () => void;
  children: ReactNode;
  alignTop?: boolean;
  coverAllMobile?: boolean;
  disableOverlayClick?: boolean;
}

export const Modal: React.FC<Props> = ({
  visible,
  width,
  closeModal,
  children,
  alignTop,
  coverAllMobile,
  disableOverlayClick,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    if (visible) {
      document.body.setAttribute("style", "overflow: hidden;");
      overlayRef!.current!.scrollTo(0, 0);
    } else {
      document.body.setAttribute("style", "overflow: auto;");
    }
  }, [visible]);

  useEffect(() => {
    const _viewHeight = Math.min(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    setViewHeight(_viewHeight);
  }, [null]);

  return (
    <Overlay
      visible={visible}
      onMouseDown={disableOverlayClick ? () => {} : closeModal}
      alignTop={alignTop}
      ref={overlayRef}
      coverAllMobile={coverAllMobile}
    >
      <ModalWindow
        onMouseDown={(e) => e.stopPropagation()}
        visible={visible}
        width={width}
        alignTop={alignTop}
        coverAllMobile={coverAllMobile}
      >
        {children}
      </ModalWindow>
    </Overlay>
  );
};

const Overlay = styled.div`
  ${ModalOverlayCss}
`;

const ModalWindow = styled.div`
  ${ModalWindowCss};
`;
