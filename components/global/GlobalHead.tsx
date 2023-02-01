import Script from "next/script";
import { Fragment } from "react";

export const GlobalHead = () => (
  <Fragment>
    {/* <meta name="google-signin-scope" content="profile email" /> */}
    {/* <meta name="google-signin-client_id" content={process.env.GAPI_CLIENT_ID} /> */}

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    {/* Favicons */}
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicon/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicon/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicon/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicon/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicon/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicon/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicon/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicon/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon/favicon-96x96.png"
    />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <meta name="msapplication-TileColor" content="#323847" />
    <meta
      name="msapplication-TileImage"
      content="/favicon/ms-icon-144x144.png"
    />

    {/* <link rel="manifest" href="/manifest.json" /> */}
    <meta name="theme-color" content="#323847" />

    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3196241,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />

    {/* <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','G-CSH3FHQBZD');`,
      }}
    /> */}

    {/* MapBox */}
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css"
      rel="stylesheet"
    />

    {/* Plausible Analytics */}
    <script
      defer
      data-domain="nomadable.net"
      src="https://plausible.io/js/plausible.js"
    ></script>

    {/* Speed Test */}
    <script src="//speedof.me/api/api.js" type="text/javascript" async />
  </Fragment>
);
