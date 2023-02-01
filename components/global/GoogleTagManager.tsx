import Script from "next/script";
import React, { Fragment } from "react";

interface Props {}

export const GoogleTagManager: React.FC<Props> = ({}) => {
  return (
    <Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-CSH3FHQBZD`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-CSH3FHQBZD');
      `}
      </Script>
    </Fragment>
  );
};
