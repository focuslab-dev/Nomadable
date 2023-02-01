import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import {
  FormLabelStyle,
  FormStyle,
} from "../../styles/styled-components/Forms";

interface Props {
  label: string;
  value: string;
  placeholder: string;
  width?: string;
  textArea?: boolean;
  onChange: (e: any) => void;
  height?: string;
  error?: boolean;
  errorMessage?: string;
  small?: boolean;
}

export const FormSet: React.FC<Props> = (props) => {
  return (
    <FormSetWrapper width={props.width}>
      <FormLabelStyle small={props.small}>{props.label}</FormLabelStyle>

      {props.textArea ? (
        <Textarea
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          height={props.height}
          error={props.error}
          small={props.small}
        />
      ) : (
        <Form
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          error={props.error}
          small={props.small}
        />
      )}
      {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    </FormSetWrapper>
  );
};

const FormSetWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width || "100%"};
`;

const Form = styled.input`
  ${FormStyle}
`;

const Textarea = styled.textarea<{
  height?: string;
  error?: boolean;
  small?: boolean;
}>`
  ${FormStyle};

  height: ${(props) => props.height || "8rem"};
`;

const ErrorMessage = styled.div`
  color: ${cons.COLOR_RED_0};
  ${FontSizeSemiSmall};
  font-weight: 400;
  margin-top: 0.5rem;
`;
