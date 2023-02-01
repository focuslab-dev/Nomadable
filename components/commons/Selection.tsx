import React from "react";
import styled from "styled-components";
import { isDataView } from "util/types";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { FormStyle } from "../../styles/styled-components/Forms";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  ids: string[];
  texts: string[];
  selectedId: string;
  onChange: (id: string) => void;
  small?: boolean;
}

export const Selection: React.FC<Props> = (props) => {
  const handleChange = (event: any) => {
    props.onChange(event.target.value);
  };

  return (
    <SelectionWrapper
      onChange={handleChange}
      defaultValue={props.selectedId}
      small={props.small}
    >
      {props.ids.map((id, index) => {
        return (
          <Option key={id} value={id}>
            {props.texts[index]}
          </Option>
        );
      })}
    </SelectionWrapper>
  );
};

const SelectionWrapper = styled.select<{ small?: boolean }>`
  ${ClickableStyle}
  ${FormStyle}
  width: auto;
  /* height: 3rem; */
  padding: 0.7rem 0.7rem;

  ${(props) =>
    props.small &&
    `
    padding: 0rem 0.8rem;
    height: 2.3rem;
    font-weight: bold;
     ${fs.FontSizeSmall};
  `}
`;

const Option = styled.option``;
