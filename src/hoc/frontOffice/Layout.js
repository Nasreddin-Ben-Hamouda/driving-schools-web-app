import React,{Suspense} from "react";
import Footer from "../../components/frontOffice/Footer";
import Header from "../../components/frontOffice/Header";
import GlobalStyles from "../../styles/frontOffice/globalStyles";

const Layout = (prop) => {
    return (
        <React.Fragment>
            <GlobalStyles />
            <Header />
                {prop.children}
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
