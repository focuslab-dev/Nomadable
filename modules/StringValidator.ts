export const validateEmail = (str: string): string => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(str)) {
    return "";
  }

  return "Email address is invalid.";
};

export const PASSWORD_MIN_LENGTH = 8;

export const validatePassword = (pw: string): string => {
  if (
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    // /[^A-Za-z0-9]/.test(pw) &&
    pw.length >= PASSWORD_MIN_LENGTH
  ) {
    return "";
  }

  return `Passwords must be at least ${PASSWORD_MIN_LENGTH} characters long, including numbers.`;
};

export const USER_NAME_MAX_LENGTH = 30;

// isAlphabet
export const validateName = (str: string): string => {
  if (
    /^[a-zA-Z\s]*$/.test(str) &&
    // /[^A-Za-z0-9]/.test(pw) &&
    str.length <= USER_NAME_MAX_LENGTH &&
    str.length > 0
  ) {
    return "";
  }

  return `Username must be in alphabetical characters only.`;
};

export const USER_ID_MAX_LENGTH = 30;

export const validateUserId = (str: string): string => {
  if (/^\w+$/.test(str) && str.length <= USER_ID_MAX_LENGTH && str.length > 0) {
    return "";
  }

  return `User ID must be in alphabetical characters and underscores "_" only.`;
};

export const validateUrl = (str: string, required: boolean): string => {
  if (!required && str.length < 1) return "";

  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return "Please input valid URL.";
  }

  if (url.protocol === "http:" || url.protocol === "https:") {
    return "";
  }

  return "Please input valid URL.";
};
