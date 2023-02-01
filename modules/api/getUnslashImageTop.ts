import { createApi } from "unsplash-js";

// on your node server
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const getUnsplashImageTop = async (query: string): Promise<string> => {
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 1,
      orientation: "landscape",
    });

    if (!response || !response.response) throw Error;

    return response.response.results[0].urls.small;
  } catch (error) {
    return "";
  }
};
