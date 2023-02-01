import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { COOKIE_ACCESS_TOKEN } from "../constants";
import { createCookie } from "./CookieHandler";

const TOKEN_VALID_FOR = "90 days";
const COOKIE_VALID_FOR = 90;

export const hashWithSalt = function (string: string, salt: string) {
  const hashedString = CryptoJS.PBKDF2(string, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();
  return hashedString;
};

export const createPassword = function (rawPassword: string) {
  const salt = Buffer.from(
    CryptoJS.lib.WordArray.random(128 / 8).toString(),
    "base64"
  ).toString();
  const hashedPassword = hashWithSalt(rawPassword, salt);
  return { salt, hashedPassword };
};

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_VALID_FOR, // expires in 90 days
  });
  return token;
};

export const saveTokenToCookie = (token: string) => {
  createCookie(COOKIE_ACCESS_TOKEN, token, COOKIE_VALID_FOR, "/");
};
