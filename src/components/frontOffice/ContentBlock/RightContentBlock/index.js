import { Row, Col } from "antd";
import {Slide} from "react-awesome-reveal";

import SvgIcon from "../../UI/SvgIcon";
import Button from "../../UI/Button";
//import * as images from "../../../../assets/frontOffice/img"

import * as S from "./styles";

const RightBlock = ({ title, content, button, icon, id }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <S.RightBlockContainer>
      <Row type="flex" justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={11} xs={24}>
          <Slide direction="left">
            <S.ContentWrapper>
              <h6 className="customH">{title}</h6>
              <S.Content>{content}</S.Content>
              <S.ButtonWrapper>
                {button &&
                  typeof button === "object" &&
                  button.map((item, id) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        width="true"
                        onClick={() => scrollTo("about")}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Slide>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide direction="right">
            <SvgIcon
              src={icon}
              className="about-block-image"
              width="100%"
              height="100%"
            />
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
};

export default RightBlock;
