import { FilterObj, PlaceWithData } from "../../redux/slices/placeSlice";
import * as cons from "./../../constants";
import * as ct from "./cities";
/**
 * Type
 */

export interface Article {
  slug: string;
  city: ct.City;
  title: string;
  filterObj: FilterObj;
  placeCnt: number;
  omitPlaceIds: string[];
  omitReviewIds: string[];
}

export interface ArticleWithData extends Article {
  placesWithData: PlaceWithData[];
}

/**
 * Articles
 */

const BANGKOK_CORWORKING: Article = {
  slug: `top-coworking-spaces-${ct.THAILAND_BANGKOK.slug}`,
  city: ct.THAILAND_BANGKOK,
  title: "Top 10 Coworking Spaces in Bangkok, Thailand",
  filterObj: {
    placeTypes: [cons.PLACE_TYPE_WORKSPACE],
    availability: [cons.AVL_DROP_IN],
    saved: false,
    sortBy: cons.SORT_BY_REVIEW,
  },
  placeCnt: 10,
  omitPlaceIds: [],
  omitReviewIds: [],
};

const BANGKOK_CAFE: Article = {
  slug: `top-work-study-cafes-${ct.THAILAND_BANGKOK.slug}`,
  city: ct.THAILAND_BANGKOK,
  title: "Top 10 Study & Work Friendly Cafes in Bangkok, Thailand",
  filterObj: {
    placeTypes: [cons.PLACE_TYPE_CAFE],
    availability: [],
    saved: false,
    sortBy: cons.SORT_BY_REVIEW,
  },
  placeCnt: 10,
  omitPlaceIds: [],
  omitReviewIds: [],
};

const CHANGMAI_PLACE: Article = {
  slug: `places-to-work-from-in-${ct.THAILAND_BANGKOK.slug}`,
  city: ct.THAILAND_CHIANGMAI,
  title:
    "10 Best Work-friendly Cafes & Coworking Spaces in Chiang Mai, Thailand",
  filterObj: {
    placeTypes: [],
    availability: [],
    saved: false,
    sortBy: cons.SORT_BY_REVIEW,
  },
  placeCnt: 10,
  omitPlaceIds: [],
  omitReviewIds: [],
};

/**
 * Export
 */

export const ARTICLES: Article[] = [
  // South East Asia
  BANGKOK_CORWORKING,
  BANGKOK_CAFE,
  CHANGMAI_PLACE,
  // East Europe
];

export const ARTICLE_LINKS = ARTICLES.map((article) => {
  return {
    url: `${cons.APP_URL}/article/${article.slug}`,
    text: article.title,
  };
});
