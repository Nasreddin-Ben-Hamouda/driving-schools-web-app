import { lazy } from "react";
import { Row, Col } from "antd";
import {Fade} from "react-awesome-reveal";

import * as S from "./styles";

const Button = lazy(() => import("../UI/Button"));

const MiddleBlock = ({ title, content, button }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade direction="up">
          <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 className="customH">{title}</h6>
              <S.Content>{content}</S.Content>
              {button ? (
                <Button
                  name="submit"
                  type="submit"
                  onClick={() => scrollTo("mission")}
                >
                  {button}
                </Button>
              ) : (
                ""
              )}
            </Col>
          </S.ContentWrapper>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default MiddleBlock;
