import styled, { css } from "styled-components";
import * as cons from "../../constants";
import {
  FontSizeNormal,
  FontSizeSemiLarge,
  FontSizeSemiSmall,
  FontSizeSmall,
} from "./FontSize";

export const FormLabelStyle = styled.div<{ small?: boolean }>`
  font-weight: bold;
  ${FontSizeSemiSmall};
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;

  ${(props) =>
    props.small &&
    `
    margin-top: 1rem;
    margin-bottom: 0.7rem;
  `};

  /* color: ${cons.FONT_COLOR_LIGHT}; */
`;

export const FormStyle = css<{
  error?: boolean;
  maxWidth?: string;
  small?: boolean;
}>`
  width: 100%;
  ${FontSizeNormal};
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};

  padding: 0.9rem 1rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  max-width: ${(props) => props.maxWidth};
  color: ${cons.FONT_COLOR_NORMAL};

  &::placeholder {
    font-style: italic;
    color: ${cons.FONT_COLOR_LIGHTEST};
  }

  ${(props) =>
    props.error &&
    `
  border: 1px solid ${cons.COLOR_ERROR_2};
`};

  ${(props) =>
    props.small &&
    `
    padding: 0.7rem 0.8rem;
`};
`;

export const FormStyleGray = css`
  ${FormStyle}
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  border: none;
`;

export const FormStyleLarge = css`
  ${FormStyle};
  ${FontSizeSemiLarge};
  padding: 0.9rem 1rem;
  border-radius: 0.4rem;
`;

export const InputFormStyle = styled.input`
  ${FormStyle}
`;

export const InputFormLargeStyle = styled.input`
  ${FormStyleLarge}
  font-weight: bold;
`;

export const TextareaFormStyle = styled.textarea`
  ${FormStyle};
  height: 100%;
`;

export const InfotipStyle = styled.div`
  ${FontSizeSmall};
  color: ${cons.FONT_COLOR_LIGHT};
  margin-bottom: 0.6em;
  margin-top: -0.6em;
`;

export const DividerStyle = styled.div`
  height: 1px;
  background-color: ${cons.FONT_COLOR_LIGHTEST};
  width: 100%;
  margin: 2rem 0;
`;

export const FooterWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.2rem;
  margin-top: -0.2rem;
`;

export const ErrorMsgStyle = styled.div`
  color: ${cons.COLOR_ERROR_0};
  ${FontSizeSemiSmall};
  margin-top: 0.6em;
  font-weight: 400;
`;

export const RedSpanStyle = styled.span`
  color: ${cons.COLOR_ERROR_0};
`;

export const SignupErrorStyle = styled.div`
  color: ${cons.COLOR_ERROR_0};
  ${FontSizeSemiSmall};
  margin-top: 1em;
  margin-bottom: -1em;
`;

export const TermsAndPrivacyStyle = styled.div``;
