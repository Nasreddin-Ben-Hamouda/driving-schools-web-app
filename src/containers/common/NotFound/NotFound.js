import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import img from "../../../assets/frontOffice/img/illustartions/404.svg"

const styles = theme => ({
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    wrapper: {
        width: "100%",
        height: "100vh"
    },
    inner: {
        flexDirection: "column",
        maxWidth: "320px"
    }
});

const NotFound=(props)=> {

        const { classes } =props;
        return (
            <div className={`${classes.flexCenter} ${classes.wrapper}`}>
                <div className={`${classes.flexCenter} ${classes.inner}`}>
                    <img style={{width:"150%"}}
                        className="mb-8"
                        src={img}
                        alt=""
                    />
                    <br/><br/>
                    <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        onClick={() => props.history.push("/")}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }


export default withStyles(styles, { withTheme: true })(NotFound);
