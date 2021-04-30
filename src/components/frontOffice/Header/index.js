import { useState, Fragment, lazy } from "react";
import { Row, Col, Drawer,Dropdown,Menu } from "antd";
import { LogoutOutlined,LoginOutlined,UserOutlined,UserAddOutlined,BankFilled } from '@ant-design/icons';
import { CSSTransition } from "react-transition-group";


import * as S from "./styles";

const SvgIcon = lazy(() => import("../UI/SvgIcon"));
const Button = lazy(() => import("../UI/Button"));

const Header = (props) => {
  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [auth,setAuth]=useState(false)

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    const menu = (
        <Menu>
            <Menu.Item><BankFilled/>Companies</Menu.Item>
            <Menu.Item><LogoutOutlined/> Logout</Menu.Item>
        </Menu>
    );
    return (
      <Fragment>
        <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
          <S.Span>About</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <S.Span>Mission</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
          <S.Span>Product</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall
            onClick={() => scrollTo("contact")}
        >
          <S.Span>
            Contact
          </S.Span>
        </S.CustomNavLinkSmall>
          {auth ?
              <Dropdown overlay={menu}>
                <S.CustomNavLinkSmall style={{ width: "180px" }}>
                  <Button className="ant-dropdown-link" color="#fff">
                    <UserOutlined />
                    <S.Span style={{marginLeft:"10%"}}>Nasr Eddine </S.Span>
                  </Button>
                </S.CustomNavLinkSmall>
              </Dropdown>
                  :
              <Fragment>
                <S.CustomNavLinkSmall style={{ width: "140px" }}>
                    <Button color="#fff" onClick={()=>props.openModal('login')}>
                      <LoginOutlined/>
                      <S.Span style={{marginLeft:"10%"}}>Sign In </S.Span>
                    </Button>
                </S.CustomNavLinkSmall>
                <S.CustomNavLinkSmall style={{ width: "140px" }} onClick={()=>props.openModal('register')}>
                    <Button >
                      <UserAddOutlined/>
                      <S.Span style={{marginLeft:"10%"}}>Sign Up</S.Span>
                    </Button>
                </S.CustomNavLinkSmall>
              </Fragment>



          }

      </Fragment>
    );
  };

  return (
    <S.Header>
      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.png" width={'150'}  style={{marginTop:-12}} />
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger>
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "2.5rem" }}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  <S.Outline padding="true" />
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
    </S.Header>
  );
};

export default Header;
