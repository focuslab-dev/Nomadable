import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { SwitchForm } from "../../commons/SwitchForm";

interface Props {
  title: string;
  item: string;
  onClickSwitch: (item: string) => void;
  active: boolean;
}

export const ToggleForm: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Label>
        <LabelIcon>{cons.AVL_ALL_LIST[props.item].icon}</LabelIcon>
        {props.title}
      </Label>
      <FormWrapper>
        <SwitchForm
          onClick={() => props.onClickSwitch(props.item)}
          active={props.active}
          activeText="Yes"
          inactiveText="No"
        />
      </FormWrapper>
    </Fragment>
  );
};

const Label = styled.div`
  font-weight: bold;
  ${fs.FontSizeSemiLarge}
  color: ${cons.FONT_COLOR_NORMAL};
`;

const LabelIcon = styled.span`
  margin-right: 0.5rem;
`;

const FormWrapper = styled.div`
  margin: 1rem 0 1.5rem 0;
`;
