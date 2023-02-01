declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV_NEXT: "development" | "production";
      BASE_URL: string;
      DB_URL: string;
      GAPI_CLIENT_ID: string;
      GAPI_CLIENT_SECRET: string;
      GAPI_KEY: string;
      SENDGRID_API_KEY: string;
      JWT_SECRET: string;
      MAPBOX_ACCESS_TOKEN: string;
      LANG: "JP" | "EN";
      KPN_CLIENT_ID: string;
      KPN_CLIENT_SECRET: string;
      SOM_API_ACCOUNT: string;
      SOM_API_DOMAIN: string;
      UNSPLASH_ACCESS_KEY: string;
      UNSPLASH_SECRET_KEY: string;
      GOOGLE_TAG_MANAGER_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
