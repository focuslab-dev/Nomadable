import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { ArticleWithData } from "../../data/articles/articles";
import { forMobile } from "../../styles/Responsive";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { Header1, Header2 } from "../../styles/styled-components/Texts";
import { CardWithImage } from "../commons/CardWithImage";

interface Props {
  articlesWithData: ArticleWithData[];
}

export const ArticlesSection: React.FC<Props> = (props) => {
  if (!props.articlesWithData) return null;
  /**
   * Render
   */

  return (
    <ArticleSection>
      <ArticleHeader>Articles</ArticleHeader>
      <ArticlesWrapper>
        {props.articlesWithData.map((at) => (
          <Link href={`/article/${at.slug}`} key={at.slug}>
            <ArticleItemWrapper key={at.slug}>
              <CardWithImage
                image={at.placesWithData[0].images[0]}
                title={at.title}
              />
            </ArticleItemWrapper>
          </Link>
        ))}
      </ArticlesWrapper>
    </ArticleSection>
  );
};

// Articles

const ArticleSection = styled.div`
  margin-top: 1.8rem;

  ${forMobile(`
    margin-top: 1.5rem;
  `)}
`;

const ArticleHeader = styled.div`
  ${Header1};
  margin-bottom: 1.5rem;
`;

const ArticlesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ArticleItemWrapper = styled.div`
  ${ClickableStyle};

  ${forMobile(`
    width: calc(50% - 0.5rem);
  `)}
`;
