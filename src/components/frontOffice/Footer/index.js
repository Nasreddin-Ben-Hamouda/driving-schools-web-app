import { lazy, Fragment } from "react";
import { Row, Col } from "antd";
import {Fade} from "react-awesome-reveal";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../UI/SvgIcon"));
const Container = lazy(() => import("../UI/Container"));

const Footer = () => {
  /*const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };*/

  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
        <S.Footer>
          <Container>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <Fade direction="up">
                <S.Language>Contact</S.Language>
                <S.Large to="/">Tell us everything</S.Large>
                <S.Para>
                    Do you have any question regarding the project? Feel free to reach out.
                </S.Para>
                <a href="mailto:nasreddinbenhamouda@gmail.com">
                  <S.Chat>Let's Chat</S.Chat>
                </a>
                </Fade>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24}>
                <Fade direction="up">
                <S.Title>Policy</S.Title>
                <S.Large to="/" left="true">
                  Application Security
                </S.Large>
                <S.Large left="true" to="/">
                  Software Principles
                </S.Large>
                </Fade>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Fade direction="up">
                <S.Empty />
                <S.Large left="true" to="/">
                  Support Center
                </S.Large>
                <S.Large left="true" to="/">
                  Customer Support
                </S.Large>
                </Fade>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <Fade direction="up">
                <S.Language>ADDRESS</S.Language>
                <S.Para>Rancho Santa Margarita</S.Para>
                <S.Para>2131 Elk Street</S.Para>
                <S.Para>California</S.Para>
                </Fade>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24}>
                <Fade direction="up">
                <S.Title>Company</S.Title>
                <S.Large left="true" to="/">
                  About
                </S.Large>
                <S.Large left="true" to="/">
                  Blog
                </S.Large>
                <S.Large left="true" to="/">
                  Press
                </S.Large>
                <S.Large left="true" to="/">
                  Careers & Culture
                </S.Large>
                </Fade>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Fade direction="up">
                <S.Select>
                  <S.Label htmlFor="select-lang">Language</S.Label>
                  <S.LangSelect id="select-lang">
                    <option value="en">English</option>
                  </S.LangSelect>
                </S.Select>
                </Fade>
              </Col>
            </Row>
          </Container>

        </S.Footer>

        <S.Extra>
          <Container border="true">
              <Row
                type="flex"
                justify="space-between"
                align="middle"
                style={{ paddingTop: "3rem" }}
              >
                <S.NavLink to="/">
                  <S.LogoContainer>
                    <Fade direction="up">
                      <SvgIcon
                        src="logo.svg"
                        aria-label="homepage"
                        width="101px"
                        height="64px"
                      />
                    </Fade>
                  </S.LogoContainer>
                </S.NavLink>
                <S.FooterContainer>
                  <Fade direction="up">
                    <SocialLink
                      href="https://github.com/Adrinlol/create-react-app-adrinlol"
                      src="github.svg"
                    />
                  </Fade>
                  <Fade direction="up">
                    <SocialLink
                      href="#"
                      src="twitter.svg"
                    />
                  </Fade>
                  <Fade direction="up">
                    <SocialLink
                      href="https://www.linkedin.com/in/nasr-eddin-ben-hamouda-998107172/"
                      src="linkedin.svg"
                    />
                  </Fade>
                  <Fade direction="up">
                    <SocialLink
                      href="https://github.com/Nasreddin-Ben-Hamouda"
                      src="instagram.svg"
                    />
                  </Fade>
                  <Fade direction="up">
                    <SocialLink
                      href="#"
                      src="medium.svg"
                    />
                  </Fade>
                </S.FooterContainer>
              </Row>
          </Container>
        </S.Extra>
    </Fragment>
  );
};

export default Footer;


