import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { Contributer } from "../../../redux/slices/contributerSlice";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { SectionLoader } from "../../commons/SectionLoader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectApiFetchContributersAreaStatus } from "../../../redux/slices/api/apiUserSlice";
import { updateVisibleModal } from "../../../redux/slices/uiSlice";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";

interface Props {
  contributers: Contributer[];
}

export const Contributers: React.FC<Props> = ({ contributers }) => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiFetchContributersAreaStatus);

  const onClickUser = (userId: string) => {
    dispatch(
      updateVisibleModal({ id: cons.MODAL_USER_INFO, referenceId: userId })
    );
  };

  /**
   * Render
   */
  if (contributers.length < 1) return null;

  return (
    <ContributersWrapper>
      {/* <Label>Top Contributers</Label> */}
      <ContributerContainer>
        <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
        {contributers.map(({ userId, name, picture, title, point }) => {
          return (
            <ItemWrapper key={userId} onClick={() => onClickUser(userId)}>
              <Picture>
                <PictureImg src={picture} />
              </Picture>
              <Info>
                <Name>{name}</Name>
                <Description>{title}</Description>
              </Info>
              <Point>
                <PointNumber>{point} pts</PointNumber>
              </Point>
            </ItemWrapper>
          );
        })}
      </ContributerContainer>
    </ContributersWrapper>
  );
};

const ContributersWrapper = styled.div`
  position: relative;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const ContributerContainer = styled.div`
  border-radius: 0.8rem;
  /* padding: 0.8rem 1.5rem; */
  position: relative;
`;

const ItemWrapper = styled.div`
  ${ClickableStyle}
  display: flex;
  align-items: center;
  padding: 0.8rem 0;
  box-sizing: border-box;
`;

const Picture = styled.div``;

const PictureImg = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  width: 100%;
  padding-left: 1rem;
  margin-right: 1rem;
`;

const Name = styled.div`
  ${fs.FontSizeSemiSmall};
  font-weight: bold;
`;

const Description = styled.div`
  ${fs.FontSizeSmall};
  margin-top: 0.1rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const Point = styled.div`
  ${fs.FontSizeSmall};
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
  min-width: 4rem;
  text-align: right;
`;

const PointNumber = styled.span`
  /* ${fs.FontSizeSemiLarge}; */
  margin-right: 0.3rem;
  /* font-weight: bold; */
  /* color: ${cons.FONT_COLOR_NORMAL}; */
`;
