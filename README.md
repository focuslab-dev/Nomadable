# Description

This is a source code of https://nomadable.net

# Installation Guide

## 1. Install Next.js

Install the Next.js.

```bash
$ npm install next
```

## 2. Rename env file

There is a file named ".env.example" in the root directory. Rename it to ".env.local".

## 3. Add variables to env file

Not all variables in .env.local file are needed for the app to run. However, at least the accesss token of MapBox, Google OAuth Client ID, and Google API key are required. Please make your account at https://www.mapbox.com and generate the access token there. Also, create your project on https://console.cloud.google.com and generate Google OAuth Client ID & Google API key. After you generated them, set them in .env.local file.

```
# Google OAuth Client ID & Secret
GAPI_CLIENT_ID=<YOUR_GAPI_CLIENT_ID>
GAPI_CLIENT_SECRET=<YOUR_GAPI_CLIENT_SECRET>

# Google API Key
GAPI_KEY=<YOUR_GAPI_KEY>

# MapBox Access Token
MAPBOX_ACCESS_TOKEN=<YOUR_ACCESS_TOKEN>
```

## 4. Run MongoDB process

If you haven't installed MongoDB on your machine, install it and run a mongod process on your local machine. For more guidance on how to run a mongod process, please read the following instruction.
https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/

## 5. Run the app

Now the app is ready to be run. Please run the following command on terminal and access http://localhost:3000 from a browser.

```bash
$ npm run dev
```
