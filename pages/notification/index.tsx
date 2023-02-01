import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { PointContents } from "../../components/Point/PointContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HeadSetter from "../../components/commons/HeadSetter";
import { NotificationContent } from "../../components/notification/NotificationContent";

interface Props {}

const PointContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <ConsoleShell pathname={router.pathname} headerLabel="Notification">
      <HeadSetter
        pageTitle={`Notification | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/notification`}
      />
      <NotificationContent />
    </ConsoleShell>
  );
};

export default PointContainer;

const Wrapper = styled.div`
  padding: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
`;
