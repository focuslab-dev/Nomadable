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

const Terms: React.FC<Props> = ({}) => {
  return (
    <Layout width={cons.CONTAINER_WIDTH_SO_NARROW} fixed>
      <HeadSetter
        pageTitle={`Terms | ${cons.APP_NAME}`}
        pageDescription="This is a terms page of Nomadable."
        pagePath={`${cons.APP_URL}/terms`}
      />
      <Breadcrumb breadcrumbs={[{ text: "Terms", url: "/terms" }]} />

      <ContentWrapper>
        <Title>Terms & Conditions</Title>

        <SectionWrapper>
          <SectionTitle>Acceptance of Terms</SectionTitle>
          <SectionBody>
            <p>
              Welcome to Nomadable.net. By accessing or using our website, you
              agree to be bound by these terms of service. Our services include
              listing cafes and coworking spaces, providing internet speed
              information, hosting user reviews, and allowing users to submit
              their favorite workspaces.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>User Responsibilities</SectionTitle>
          <SectionBody>
            <p>
              Users are expected to use Nomadable.net respectfully and
              responsibly. Do not post content intended to harm others. This
              includes, but is not limited to, content that is offensive,
              illegal, or violates the rights of others.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Intellectual Property</SectionTitle>
          <SectionBody>
            <p>
              All user-generated content, such as place information and reviews,
              are owned by the users who post them. Users have the right to
              update and delete their submitted content. Nomadable.net does not
              claim ownership of this content.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Liability and Disclaimer</SectionTitle>
          <SectionBody>
            <p>
              Nomadable.net is not liable for the data submitted by users. We
              strive to ensure accuracy and legality of the content but do not
              guarantee its correctness. We will take necessary actions to
              comply with the law when required.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Termination of Use</SectionTitle>
          <SectionBody>
            <p>
              We reserve the right to terminate or restrict access to our
              services for any user who posts illegal content or content
              considered harmful by Nomadable.net.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Modifications to Terms of Service</SectionTitle>
          <SectionBody>
            <p>
              These terms may be updated from time to time. Users will be
              notified of any significant changes via email.
            </p>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Contact Information</SectionTitle>
          <SectionBody>
            <p>
              For any inquiries related to these terms of service, please
              contact us at support@nomadable.net.
            </p>
          </SectionBody>
        </SectionWrapper>
      </ContentWrapper>
    </Layout>
  );
};

export default Terms;

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
