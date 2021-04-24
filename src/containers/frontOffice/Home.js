import React,{ lazy } from "react";

import IntroContent from "../../content/frontOffice/IntroContent.json";
import MiddleBlockContent from "../../content/frontOffice/MiddleBlockContent.json";
import AboutContent from "../../content/frontOffice/AboutContent.json";
import MissionContent from "../../content/frontOffice/MissionContent.json";
import ProductContent from "../../content/frontOffice/ProductContent.json";
import ContactContent from "../../content/frontOffice/ContactContent.json";

const ContactFrom = lazy(() => import("../../components/frontOffice/ContactForm"));
const ContentBlock = lazy(() => import("../../components/frontOffice/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/frontOffice/MiddleBlock"));
const Container = lazy(() => import("../../components/frontOffice/UI/Container"));
const ScrollToTop = lazy(() => import("../../components/frontOffice/UI/ScrollToTop"));
const Layout = lazy(() => import("../../hoc/frontOffice/Layout"));

const Home = () => {
    return (
        <Layout>
                <Container>
                    <ScrollToTop />
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
