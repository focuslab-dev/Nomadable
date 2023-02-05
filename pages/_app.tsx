import { AppProps } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "../redux/store";
import GlobalStyles from "../styles/GlobalStyles";
import { GlobalHead } from "../components/global/GlobalHead";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { API_IDLE } from "../constants";
import { GlobalModals } from "../components/global/GlobalModals";
import {
  apiFetchUser,
  selectApiFetchUserStatus,
} from "../redux/slices/api/apiUserSlice";
import { Notification } from "../components/global/Notification";
import { GoogleTagManager } from "../components/global/GoogleTagManager";
import {
  apiFetchEnvVariables,
  selectGapiClientId,
} from "../redux/slices/envSlice";

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();

  const apiFetchUserStatus = useAppSelector(selectApiFetchUserStatus);
  const gapiClientId = useAppSelector(selectGapiClientId);

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            // Registration was successful
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          (err) => {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, [null]);

  useEffect(() => {
    if (apiFetchUserStatus.status === API_IDLE) {
      // doFetchUser(dispatch);
      dispatch(apiFetchUser({}));
      dispatch(apiFetchEnvVariables({}));
    }
  }, [apiFetchUserStatus.status]);

  return (
    <GoogleOAuthProvider clientId={gapiClientId}>
      <Provider store={store}>
        <Head>
          <GlobalHead />
        </Head>
        {/* Google tag (gtag.js) */}
        <GoogleTagManager />
        <GlobalStyles />
        <Notification />
        <Component {...pageProps} />
        <GlobalModals />
      </Provider>
    </GoogleOAuthProvider>
  );
};

const makeStore = () => store;

export default withRedux(makeStore)(App);
