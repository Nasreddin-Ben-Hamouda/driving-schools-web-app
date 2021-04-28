
import {Fade} from "react-awesome-reveal"

import * as S from "./styles";

const Block = ({ title, content}) => {
  return (
    <S.Container>
      <Fade direction="left">
        <h6>{title}</h6>
        <S.TextWrapper>
          <S.Content>{content}</S.Content>
        </S.TextWrapper>
      </Fade>
    </S.Container>
  );
};

export default Block;
