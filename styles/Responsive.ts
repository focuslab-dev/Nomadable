import { WIDTH_TABLET } from "../constants";

export const forMobile = (styles: string) => {
  return `
    @media only screen and (max-width: ${WIDTH_TABLET}px) {
      ${styles}
    }
  `;
};
