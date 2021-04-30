import React,{ lazy,useState } from "react";

import IntroContent from "../../../content/frontOffice/IntroContent.json";
import MiddleBlockContent from "../../../content/frontOffice/MiddleBlockContent.json";
import AboutContent from "../../../content/frontOffice/AboutContent.json";
import MissionContent from "../../../content/frontOffice/MissionContent.json";
import ProductContent from "../../../content/frontOffice/ProductContent.json";
import ContactContent from "../../../content/frontOffice/ContactContent.json";
import "antd/dist/antd.css";
import { Modal} from 'antd';
import {updateObject} from "../../../helpers/utility"
import {CloseOutlined} from "@ant-design/icons"
const ContactFrom = lazy(() => import("../../../components/frontOffice/ContactForm"));
const ContentBlock = lazy(() => import("../../../components/frontOffice/ContentBlock"));
const MiddleBlock = lazy(() => import("../../../components/frontOffice/MiddleBlock"));
const Container = lazy(() => import("../../../components/frontOffice/UI/Container"));
const ScrollToTop = lazy(() => import("../../../components/frontOffice/UI/ScrollToTop"));
const Layout = lazy(() => import("../../../hoc/frontOffice/Layout"));
const Login=lazy(()=>import('../Auth/Login/Login'))
const Register=lazy(()=>import('../Auth/Register/Register'))
const ForgotPassword=lazy(()=>import('../Auth/ForgetPassword/ForgetPassword'))

const Home = (props) => {
    const [visible, setVisible] = useState({
      login:false,
      register:false,
      forgotPassword:false,
    });

    const setModalVisibility=()=>{
        const updatedVisible={
            login:false,
            register:false,
            forgotPassword:false
        }
        setVisible(updateObject(visible,updatedVisible));
        return updatedVisible
    }
    const showModalHandler=async (item)=>{
        const cleanVisible={...setModalVisibility()}
        const updatedVisible=updateObject(cleanVisible,{[item]:true});
        setVisible(updateObject(visible,updatedVisible));
    }
    return (
        <Layout openModal={showModalHandler}>
                <Container>
                    <ScrollToTop />
                        <Modal
                            centered
                            visible={visible.login ||visible.register||visible.forgotPassword}
                            onCancel={setModalVisibility}
                            width={800}
                            footer={null}
                            destroyOnClose={true}
                            style={{marginTop:"1%"}}
                            closeIcon={<CloseOutlined style={{fontSize:"22px"}}/>}
                        >
                            {
                                visible.login?
                                    <Login open={showModalHandler}{...props} />
                                    :
                                null
                            }
                            {
                                visible.register?
                                    <Register open={showModalHandler} {...props}/>
                                    :
                                    null
                            }
                            {
                                visible.forgotPassword?
                                    <ForgotPassword open={showModalHandler} {...props}/>
                                    :
                                    null
                            }

                        </Modal>
                    <ContentBlock
                        type="right"
                        first="true"
                        title={IntroContent.title}
                        content={IntroContent.text}
                        button={IntroContent.button}
                        icon="developer.svg"
                        id="intro"
                    />
                    <MiddleBlock
                        title={MiddleBlockContent.title}
                        content={MiddleBlockContent.text}
                        button={MiddleBlockContent.button}
                    />
                    <ContentBlock
                        type="left"
                        title={AboutContent.title}
                        content={AboutContent.text}
                        section={AboutContent.section}
                        icon="graphs.svg"
                        id="about"
                    />
                    <ContentBlock
                        type="right"
                        title={MissionContent.title}
                        content={MissionContent.text}
                        icon="product-launch.svg"
                        id="mission"
                    />

                    <ContentBlock
                        type="left"
                        title={ProductContent.title}
                        content={ProductContent.text}
                        icon="waving.svg"
                        id="product"
                    />
                    <ContactFrom
                        title={ContactContent.title}
                        content={ContactContent.text}
                        id="contact"
                    />
                </Container>
        </Layout>
    );
};

export default Home;
