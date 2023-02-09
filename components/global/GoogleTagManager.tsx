import Script from "next/script";
import React, { Fragment } from "react";

interface Props {
  googleId: string;
}

export const GoogleTagManager: React.FC<Props> = ({ googleId }) => {
  return (
    <Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${googleId}');
      `}
      </Script>
    </Fragment>
  );
};
