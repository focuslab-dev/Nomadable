import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { selectNotificationState } from "../../redux/slices/uiSlice";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { NoSelect } from "../../styles/styled-components/StyleUtils";

interface Props {}

export const Notification: React.FC<Props> = ({}) => {
  const [visible, setVisible] = useState(false);

  const notification = useAppSelector(selectNotificationState);

  const showNotification = () => {
    setVisible(true);
  };

  const hideNotification = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (notification.timestamp > 0) {
      showNotification();
      setTimeout(() => {
        hideNotification();
      }, notification.seconds * 1000);
    }
  }, [notification.timestamp]);

  return (
    <NotificationWrapper>
      <NotificatoinBar type={notification.type} visible={visible}>
        {notification.message}
      </NotificatoinBar>
    </NotificationWrapper>
  );
};

const NotificationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  display: flex;
  justify-content: center;
  ${NoSelect}

  transform: translateY(-4rem);
`;

const NotificatoinBar = styled.div<{ type: string; visible: boolean }>`
  padding: 1em 2em;
  border-radius: 50px;
  box-shadow: ${cons.SHADOW_3};
  ${FontSizeSemiSmall};

  z-index: 10;
  opacity: 0.9;

  ${(props) =>
    props.type === cons.NOTIFICATION_SUCCEED &&
    `
    background-color: ${cons.COLOR_PRIMARY_6};
    color: ${cons.COLOR_PRIMARY_0};
  `};

  ${(props) =>
    props.type === cons.NOTIFICATION_ERROR &&
    `
    background-color: ${cons.COLOR_ERROR_6};
    color: ${cons.COLOR_ERROR_0};
  `};

  ${(props) =>
    props.type === cons.NOTIFICATION_INFO &&
    `
    background-color: ${cons.COLOR_BLUE_6};
    color: ${cons.COLOR_BLUE_0};
  `};

  transition: 0.2s all ease-out;

  ${(props) =>
    props.visible &&
    `
    transform: translateY(4.7rem);
  `};
`;
