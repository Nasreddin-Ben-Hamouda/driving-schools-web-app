import React from "react";
import Footer from "../../components/frontOffice/Footer";
import Header from "../../components/frontOffice/Header";
import GlobalStyles from "../../styles/frontOffice/globalStyles";

const Layout = (props) => {
    return (
        <React.Fragment>
            <GlobalStyles />
            <Header openModal={props.openModal}/>
                {props.children}
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
