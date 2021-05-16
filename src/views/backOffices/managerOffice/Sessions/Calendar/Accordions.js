import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CBadge, CButton, CCardBody, CSpinner} from "@coreui/react";
import {Paper,Grid,Avatar,Chip,Accordion,AccordionDetails,AccordionSummary,Typography} from '@material-ui/core';
import {Popconfirm} from "antd";
import "antd/dist/antd.css";
import axios from "../../../../../axios/scheduling-service";
import cogoToast from "cogo-toast";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const agencyId="606f0dc7e3bf6a72dd524d4f";
const Accordions=(props)=> {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [sessions, setSessions] = useState(null);
    useEffect(() => {
        getAllSessions()
    }, []);
    const getAllSessions = () => {
        axios.get('/session/date/'+agencyId+'/'+props.date)
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const cancelSessionHandler = (id) => {
        const data = {
            agency: agencyId
        }
        axios.patch('/session/cancel/' + id, data)
            .then(() => {
                cogoToast.success("Session canceled successfully", {position: "top-right"})
                getAllSessions()
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }
    const finishSessionHandler = (id) => {
        const data = {
            agency: agencyId
        }
        axios.patch('/session/finish/' + id, data)
            .then(() => {
                cogoToast.success("Session finished successfully", {position: "top-right"})
                getAllSessions()
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    return (
        <div className={classes.root}>
            {
                sessions ?
                    sessions.map(session => {
                        return (
                            <Accordion key={session._id} expanded={expanded === session._id}
                                       onChange={handleChange(session._id)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon style={{color:"#3c4b64"}}/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading} component={'span'}
                                                style={{color: "#3c4b64", fontWeight: "bold", fontSize: "14px"}}>

                                        <Chip
                                            avatar={<Avatar style={{color:"#3c4b64"}}>{session.client.name.slice(0, 1)}</Avatar>}
                                            label={session.client.surname + " " + session.client.name}
                                            style={{color:"#3c4b64"}}
                                            variant="outlined"
                                        />

                                    </Typography>

                                    <Typography className={classes.secondaryHeading}
                                                style={{position: "absolute", right: "55px"}}>
                                        <CBadge color={"secondary"} style={{color: "#3c4b64"}}>
                                            {new Date(session.startDate).toLocaleString().slice(10)} => {new Date(session.endDate).toLocaleString().slice(10)}
                                        </CBadge>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'span'} >

                                                <Paper className={classes.paper} style={{width:"20rem",height:"2rem",marginLeft:"17%",textAlign:"center"}} >
                                                    <CBadge  style={{color: "#3c4b64",marginTop:"2%"}}>

                                                        Monitor : {session.monitor.surname+" "+session.monitor.name}
                                                    </CBadge>
                                                </Paper>

                                                <Paper className={classes.paper} style={{width:"20rem",height:"2rem",marginLeft:"17%",marginTop:"2%",textAlign:"center"}} >
                                                    <CBadge  style={{color: "#3c4b64",marginTop:"2%"}}>

                                                        Car : {session.car.mark+" "+session.car.model}
                                                    </CBadge>
                                                </Paper>
                                                <div style={{
                                                    width: "20rem",
                                                    height: "2rem",
                                                    marginLeft: "17%",
                                                    marginTop: "2%",
                                                    textAlign: "center"
                                                }}>
                                                    <Popconfirm title="Are you sure？" okText="Yes"
                                                                onConfirm={() => finishSessionHandler(session._id)}
                                                                cancelText="No">

                                                        <CButton size="sm" color="success" className="ml-1">
                                                            Finish
                                                        </CButton>
                                                    </Popconfirm>
                                                    <Popconfirm title="Are you sure？" okText="Yes"
                                                                onConfirm={() => cancelSessionHandler(session._id)}
                                                                cancelText="No">

                                                        <CButton size="sm" color="warning" className="ml-1">
                                                            Cancel
                                                        </CButton>
                                                    </Popconfirm>

                                                </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })

                    :
                    <CSpinner color="info" style={{marginLeft: "45%"}}/>
            }

        </div>
    );
}
export default Accordions
