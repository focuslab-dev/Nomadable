import { AppProps } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "mapbox-gl/dist/mapbox-gl.css";

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
  selectGaMeasurementId,
  selectGapiClientId,
} from "../redux/slices/envSlice";
import { apiFetchCitiesWithData } from "../redux/slices/api/apiCitySlice";

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();

  const apiFetchUserStatus = useAppSelector(selectApiFetchUserStatus);
  const gapiClientId = useAppSelector(selectGapiClientId);
  const gaMeasurementId = useAppSelector(selectGaMeasurementId);

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            // Registration was successful
          },
          (err) => {
            // registration failed :(
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
      dispatch(apiFetchCitiesWithData({}));
    }
  }, [apiFetchUserStatus.status]);

  return (
    <GoogleOAuthProvider
      clientId={
        "397305107163-o3391ke1fgum12lkv0g4jgnt9gb4j4vr.apps.googleusercontent.com"
      }
    >
      <Provider store={store}>
        <Head>
          <GlobalHead />
        </Head>
        {/* Google tag (gtag.js) */}
        <GoogleTagManager googleId={gaMeasurementId} />
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
