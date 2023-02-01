import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { callFetchArticlesWithData } from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import { ArticlesSection } from "../../components/articles/ArticlesSection";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import {
  APP_NAME,
  APP_URL,
  CONTAINER_WIDTH_SO_NARROW,
  PATH_ARTICLES,
} from "../../constants";
import { ARTICLES, ArticleWithData } from "../../data/articles/articles";

interface Props {
  articlesWithData: ArticleWithData[];
}

const Articles: React.FC<Props> = (props) => {
  const [_articles, setArticles] = useState<ArticleWithData[]>(
    props.articlesWithData
  );

  /**
   * Functions
   */

  const fetchArticles = async () => {
    const { articlesWithData } = await callFetchArticlesWithData(ARTICLES);
    setArticles(articlesWithData);
  };

  /**
   * Efect
   */

  useEffect(() => {
    fetchArticles();
  }, [null]);

  /**
   * Render
   */

  return (
    <Layout width={CONTAINER_WIDTH_SO_NARROW} fixed>
      <HeadSetter
        pageTitle={`Articles | ${APP_NAME}`}
        pageDescription="This is the articles page of Nomadable."
        pagePath={`${APP_URL}${PATH_ARTICLES}`}
      />
      <Breadcrumb breadcrumbs={[{ text: `Articles`, url: PATH_ARTICLES }]} />
      <ArticlesSection articlesWithData={_articles} />
    </Layout>
  );
};

export default Articles;

/**
 * SSR
 */

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { articlesWithData } = await callFetchArticlesWithData(ARTICLES);

    return {
      props: {
        articlesWithData,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        articlesWithData: [],
      },
    };
  }
};
