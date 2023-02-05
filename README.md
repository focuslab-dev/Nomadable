# Description

This is a source code of https://nomadable.net

# Installation Guide

## 1. Install Next.js

Install the Next.js.

```bash
$ npm install next
```

## 2. Rename env file

There should be .env.example file in the root directory. Rename it to ".env.local".

```bash
$ mv .env.example .env.local
```

## 3. Add variables to env file

Not all variables in .env.local file are needed for the app to run. However, at least the accesss token of MapBox and Google API key are required. Please make your account at https://www.mapbox.com and generate the access token there. Also, create your project on https://console.cloud.google.com and generate a Google API key. After you generated both, set them in .env.local file.

```
# Google API
GAPI_KEY=<YOUR_GAPI_KEY>

# MapBox Access Token
MAPBOX_ACCESS_TOKEN=<YOUR_ACCESS_TOKEN>
```

## 4. Run MongoDB process

If you haven't installed MongoDB on your machine. Install it and run a mongod process on your local machine. For more guidance on how to run a mongod process, please read the following document.
https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/

## 5. Run the app

Now the app is ready to be run. Just run this on terminal.

```bash
$ npm run dev
```
