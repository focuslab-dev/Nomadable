import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { useAppSelector } from "../../redux/hooks";
import {
  selectPointEarned,
  showNotification,
} from "../../redux/slices/uiSlice";
import { CubicBezier } from "../../styles/styled-components/Animations";
import { forMobile } from "../../styles/Responsive";

interface Props {}

export const PointEarnedNotification: React.FC<Props> = ({}) => {
  const pointEarned = useAppSelector(selectPointEarned);
  const [visible, setVisible] = useState(false);

  const showNotification = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 8000);
  };

  useEffect(() => {
    if (pointEarned.updated === 0) return;
    showNotification();
  }, [pointEarned]);

  return (
    <Card visible={visible}>
      <Icon>
        <IconImg src="/icon-color/coin.svg" />
      </Icon>
      <Message>
        <Earned>
          You earned <EarnedNumber>{pointEarned.addingPoint}</EarnedNumber>{" "}
          pts!!
        </Earned>
        <TotalPoint>
          Total is now: <TotalNumber>{pointEarned.totalPoint}</TotalNumber> pts
        </TotalPoint>
      </Message>
    </Card>
  );
};

const Card = styled.div<{ visible: boolean }>`
  background-color: white;
  box-shadow: ${cons.SHADOW_3};
  border-radius: 0.4rem;
  padding: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  border: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  ${fs.FontSizeSemiLarge};
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 500;

  position: fixed;
  bottom: 2rem;
  right: -24rem;

  transition: all 0.2s ${CubicBezier};

  ${(props) =>
    props.visible &&
    `
    right: 2rem;
    ${forMobile(`
      right: 1rem;
  `)}
  `};

  ${forMobile(`
    padding: 1.5rem;
    bottom: 1.5rem;
  `)}
`;

const Icon = styled.div`
  margin-right: 2rem;

  ${forMobile(`
    margin-right: 1.3rem;
  `)}
`;

const IconImg = styled.img`
  width: 3.5rem;
  ${forMobile(`
    width: 3rem;
  `)}
`;

const Message = styled.div`
  margin-right: 0.5rem;
`;

const Earned = styled.div`
  ${fs.FontSizeLarge};
  color: ${cons.FONT_COLOR_LIGHT};
  margin-bottom: 0.6rem;
  ${forMobile(`
    ${fs.FontSizeSemiLarge};
    margin-bottom: 0.2rem;
  `)}
`;

const EarnedNumber = styled.span`
  ${fs.FontSizeExLarge};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin: 0 0.3rem;

  ${forMobile(`
    ${fs.FontSizeLarge};
  `)}
`;

const TotalPoint = styled.div`
  ${fs.FontSizeNormal};
  color: ${cons.FONT_COLOR_LIGHT};
`;

const TotalNumber = styled.span`
  color: ${cons.FONT_COLOR_NORMAL};
`;
