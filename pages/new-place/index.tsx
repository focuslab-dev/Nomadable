import React from "react";
import styled from "styled-components";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { NewPlace } from "../../components/new-place/NewPlace";
import {
  APP_LONG_DESCRIPTION,
  APP_NAME,
  APP_URL,
  CONTAINER_WIDTH_NARROW,
  CONTAINER_WIDTH_WIDE,
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_SUPER_LIGHT,
} from "../../constants";

interface Props {}

const NewPlaceContainer: React.FC<Props> = ({}) => {
  return (
    <NewPlaceContainerWrapper>
      <HeadSetter
        pageTitle={`New Place | ${APP_NAME}`}
        pageDescription={APP_LONG_DESCRIPTION}
        pagePath={`${APP_URL}/new-place`}
      />
      <Layout width={CONTAINER_WIDTH_NARROW}>
        <NewPlace />
      </Layout>
    </NewPlaceContainerWrapper>
  );
};

const NewPlaceContainerWrapper = styled.div`
  background-color: ${FONT_COLOR_SUPER_LIGHT};
`;

export default NewPlaceContainer;
