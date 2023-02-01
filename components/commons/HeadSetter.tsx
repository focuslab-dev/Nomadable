import { VFC } from "react";
import Head from "next/head";
import { APP_NAME, APP_OBP_IMAGE } from "../../constants";

interface Props {
  pageTitle: string;
  pageDescription: string;
  pagePath: string;
  pageImg?: string;
  siteName?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
}

export const HeadSetter: VFC<Props> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  siteName,
  pageImgWidth,
  pageImgHeight,
}) => {
  const _siteName = siteName || APP_NAME;

  const imgWidth = pageImgWidth ? pageImgWidth : 1280;
  const imgHeight = pageImgHeight ? pageImgHeight : 640;
  const _pageImage = pageImg || APP_OBP_IMAGE;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={pageDescription} />
      <meta property="og:url" content={pagePath} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={_siteName} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={_pageImage} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={pagePath} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={pagePath} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={_pageImage} />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/brandicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/brandicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/brandicons/favicon-16x16.png"
      />
    </Head>
  );
};

export default HeadSetter;
