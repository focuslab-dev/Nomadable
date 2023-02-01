import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";

export function OrLine() {
  return (
    <OrLineWrapper>
      <Line />
      <Text>or</Text>
      <Line />
    </OrLineWrapper>
  );
}

const OrLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0px;
`;

const Line = styled.div`
  width: 42%;
  height: 1px;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const Text = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
`;
