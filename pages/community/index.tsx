import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { EventContents } from "../../components/event/EventContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HeadSetter from "../../components/commons/HeadSetter";

interface Props {}

const EventContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <ConsoleShell pathname={router.pathname} headerLabel="Community">
      <HeadSetter
        pageTitle={`Community | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/community`}
      />
      <EventContents />
    </ConsoleShell>
  );
};

export default EventContainer;
