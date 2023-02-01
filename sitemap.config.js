module.exports = {
  siteUrl: "https://nomadable.net",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public",
  exclude: [
    "/community",
    "/new-place",
    "/notification",
    "/profile",
    "/setting",
    "/signup-succeeded",
    "/verify-acount",
  ],
  // transform
  transform: async (config, path) => {
    // custom function to ignore the path
    // if (customIgnoreFunction(path)) {
    //   return null;
    // }

    // only create changefreq along with path
    // returning partial properties will result in generation of XML field with only returned values.
    if (path === "/") {
      // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        priority: 1.0,
      };
    }

    if (path === "/articles") {
      return {
        loc: path,
        priority: 0.9,
      };
    }

    if (path.startsWith("/article")) {
      return {
        loc: path,
        priority: 0.8,
      };
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
