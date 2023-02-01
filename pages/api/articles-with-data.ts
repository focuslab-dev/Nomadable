import { fetchPlacesWithFilter } from "./../../modules/api/fetchPlacesWithFilter";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Article, ArticleWithData } from "../../data/articles/articles";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { articles } = req.body;

  try {
    const articlesWithData: ArticleWithData[] = [];
    let loopCnt = 0;

    while (articlesWithData.length < articles.length) {
      const article: Article = articles[loopCnt];

      const { places } = await fetchPlacesWithFilter(
        req.mongoose,
        "",
        article.city.boundary,
        article.filterObj,
        0,
        article.placeCnt
      );

      const placesWithData = await Promise.all([
        ...places.map(async (place) => {
          return await makePlaceWithData(req.mongoose, place);
        }),
      ]).then((values) => {
        return values;
      });

      articlesWithData.push({ ...article, placesWithData: placesWithData });

      loopCnt += 1;
    }

    return res.status(200).json({ articlesWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
