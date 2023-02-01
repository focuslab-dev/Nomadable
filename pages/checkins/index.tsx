import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HeadSetter from "../../components/commons/HeadSetter";
import { HistoryContents } from "../../components/history/HistoryContents";

interface Props {}

const HistoryContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <ConsoleShell pathname={router.pathname} headerLabel="Check-ins">
      <HeadSetter
        pageTitle={`Check-ins | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/checkins`}
      />
      <HistoryContents />
    </ConsoleShell>
  );
};

export default HistoryContainer;
