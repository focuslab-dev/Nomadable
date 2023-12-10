import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { callDownloadPlacesAsCsv } from "../../calls/downloadCalls";

import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import * as cons from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { hideSpinner, showSpinner } from "../../redux/slices/uiSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonBlackSmall } from "../../styles/styled-components/Buttons";
import {
  Header1,
  Header2,
  ParagraphLarge,
} from "../../styles/styled-components/Texts";

interface Props {}

const Privacy: React.FC<Props> = ({}) => {
  return (
    <Layout width={cons.CONTAINER_WIDTH_SO_NARROW} fixed>
      <HeadSetter
        pageTitle={`Privacy | ${cons.APP_NAME}`}
        pageDescription="This is a privacy page of Nomadable."
        pagePath={`${cons.APP_URL}/privacy`}
      />
      <Breadcrumb breadcrumbs={[{ text: "Privacy", url: "/privacy" }]} />

      <ContentWrapper>
        <Title>Privacy Policy</Title>

        <SectionWrapper>
          <SectionTitle>Introduction</SectionTitle>
          <SectionBody>
            <p>
              Welcome to Nomadable.net, a dedicated platform for digital nomads
              seeking curated lists of cafes and coworking spaces. This privacy
              policy is designed to inform you about how we collect, use, and
              safeguard the personal information you provide on our website.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Information Collection</SectionTitle>
          <SectionBody>
            <p>
              At Nomadable.net, we respect your privacy and are committed to
              protecting it. We collect personal information such as your name
              and email address directly from you when you register an account
              or sign up for our newsletter. This information is crucial for
              providing you with our services and a personalized experience.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Use of Information</SectionTitle>
          <SectionBody>
            <p>
              The information we collect is primarily used to enhance our
              services and your user experience. We utilize Google Analytics to
              understand how our services are used and to make improvements.
              Rest assured, the use of your information is limited to these
              purposes.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Cookies and Tracking Technologies</SectionTitle>
          <SectionBody>
            <p>
              Our website uses cookies mainly for authentication purposes,
              ensuring that you can securely log in to your account. These
              cookies are essential for providing a smooth and efficient user
              experience on Nomadable.net.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Sharing of Information</SectionTitle>
          <SectionBody>
            <p>
              We value your trust and therefore do not share your personal
              information with any third parties. Your privacy is our top
              priority.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>User Rights and Data Management</SectionTitle>
          <SectionBody>
            <p>
              As a valued user of Nomadable.net, you have the right to access,
              update, or delete your personal information. You can update your
              details directly through your account settings. If you wish to
              delete your account, you can do so at any time, which will remove
              your personal information from our records.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Data Security</SectionTitle>
          <SectionBody>
            <p>
              We take data security seriously. To protect your personal
              information, we employ SSL encryption and maintain a secure server
              environment. These measures ensure the safety and integrity of
              your data.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Policy Updates and User Notification</SectionTitle>
          <SectionBody>
            <p>
              We may update this privacy policy as necessary to reflect changes
              in our practices. If any significant changes are made, we will
              notify you via email.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Contact Information</SectionTitle>
          <SectionBody>
            <p>
              For any questions or concerns regarding our privacy practices,
              please feel free to contact us at yuya.uzu@gmail.com. We are here
              to assist you.
            </p>
          </SectionBody>
        </SectionWrapper>
      </ContentWrapper>
    </Layout>
  );
};

export default Privacy;

const ContentWrapper = styled.div`
  margin-bottom: 4em;
  ${forMobile(`
    margin-bottom: 3em;
  `)}
`;

const Title = styled.h1`
  ${Header1};
  margin: 1.5em 0 1.5em 0;

  ${forMobile(`
    margin: 1em 0 1em 0;
  `)}
`;

const SectionWrapper = styled.div`
  /* margin: 1rem 0rem; */
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  ${Header2};
  margin-top: 2.4rem;
`;

const SectionBody = styled.div`
  ${ParagraphLarge}
`;

const PointType = styled.div`
  display: inline-block;
  width: 14rem;
`;

const PointPoint = styled.div`
  display: inline-block;
  width: 6rem;
  text-align: right;
`;

export const DownloadLink = styled.button`
  ${ButtonBlackSmall};
  margin-top: 1.5rem;
`;
