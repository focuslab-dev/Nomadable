import { createApi } from "unsplash-js";

// on your node server
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const getUnsplashImages = async (query: string): Promise<string[]> => {
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 15,
      orientation: "landscape",
    });

    if (!response || !response.response) throw Error;

    const images = response.response.results.map((result) => result.urls.small);

    return images;
  } catch (error) {
    return [];
  }
};
