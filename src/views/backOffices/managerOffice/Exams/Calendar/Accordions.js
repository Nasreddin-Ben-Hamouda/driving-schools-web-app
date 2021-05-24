import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "../../../../../axios/scheduling-service";
import {CBadge, CButton, CCardBody, CSpinner} from "@coreui/react";
import {Paper,Grid,Avatar,Chip,Accordion,AccordionDetails,AccordionSummary,Typography} from '@material-ui/core';
import {Popconfirm} from "antd";
import "antd/dist/antd.css";
import cogoToast from "cogo-toast";
import {useSelector} from "react-redux";

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

const Accordions=(props)=> {
    const agencyId=useSelector(state=>state.user.user.agency);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [exams, setExams] = useState(null);
    useEffect(() => {
        getAllExams()
    }, []);
    const getAllExams = () => {

        axios.get('/exam/date/' + agencyId + '/' + props.date)
            .then((response) => {
                setExams(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const succeedExamHandler = (id) => {
        const data = {
            agency: agencyId
        }
        axios.patch('/exam/succeed/' + id, data)
            .then(() => {
                cogoToast.success("Exam succeeded successfully", {position: "top-right"})
                getAllExams()

            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }
    const failedExamHandler = (id) => {
        const data = {
            agency: agencyId
        }
        axios.patch('/exam/failed/' + id, data)
            .then(() => {
                cogoToast.success("Exam failed successfully", {position: "top-right"})
                getAllExams()
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    return (
        <div className={classes.root}>
            {
                exams ?
                    exams.length > 0 ?
                        exams.map(exam => {
                            return (
                                <Accordion key={exam._id} expanded={expanded === exam._id}
                                           onChange={handleChange(exam._id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon style={{color: "#3c4b64"}}/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.heading} component={'span'}
                                                    style={{color: "#3c4b64", fontWeight: "bold", fontSize: "14px"}}>

                                            <Chip
                                                avatar={<Avatar
                                                    style={{color: "#3c4b64"}}>{exam.client.name.slice(0, 1)}</Avatar>}
                                                label={exam.client.surname + " " + exam.client.name}
                                                style={{color: "#3c4b64"}}
                                                variant="outlined"
                                            />

                                        </Typography>

                                        <Typography className={classes.secondaryHeading}
                                                    style={{position: "absolute", right: "55px"}}>
                                            <CBadge color={"secondary"} style={{color: "#3c4b64"}}>
                                                {new Date(exam.examDate).toLocaleString().slice(10)}
                                            </CBadge>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography component={'span'}>

                                            <Paper className={classes.paper} style={{
                                                width: "20rem",
                                                height: "2rem",
                                                marginLeft: "17%",
                                                textAlign: "center"
                                            }}>
                                                <CBadge style={{color: "#3c4b64", marginTop: "2%"}}>

                                                    Monitor : {exam.monitor.surname + " " + exam.monitor.name}
                                                </CBadge>
                                            </Paper>
                                            <Paper className={classes.paper} style={{
                                                width: "20rem",
                                                height: "2rem",
                                                marginLeft: "17%",
                                                marginTop: "2%",
                                                textAlign: "center"
                                            }}>
                                                <CBadge style={{color: "#3c4b64", marginTop: "2%"}}>

                                                    Examiner : {exam.examinateur}
                                                </CBadge>
                                            </Paper>
                                            <Paper className={classes.paper} style={{
                                                width: "20rem",
                                                height: "2rem",
                                                marginLeft: "17%",
                                                marginTop: "2%",
                                                textAlign: "center"
                                            }}>
                                                <CBadge style={{color: "#3c4b64", marginTop: "2%"}}>

                                                    Car : {exam.car.mark + " " + exam.car.model}
                                                </CBadge>
                                            </Paper>
                                            <br/>
                                            <div style={{
                                                width: "20rem",
                                                height: "2rem",
                                                marginLeft: "17%",
                                                marginTop: "2%",
                                                textAlign: "center"
                                            }}>

                                                <Popconfirm title="Are you sure？" okText="Yes"
                                                            onConfirm={() => succeedExamHandler(exam._id)}
                                                            cancelText="No">

                                                    <CButton size="sm" color="success" className="ml-1">
                                                        Succeed
                                                    </CButton>
                                                </Popconfirm>
                                                <Popconfirm title="Are you sure？" okText="Yes"
                                                            onConfirm={() => failedExamHandler(exam._id)}
                                                            cancelText="No">

                                                    <CButton size="sm" color="warning" className="ml-1">
                                                        Failed
                                                    </CButton>
                                                </Popconfirm>
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                        :
                        <h2 style={{marginLeft:"35%"}}>No exams <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                          className="c-icon c-icon-custom-size text-danger mb-2" role="img">
                            <path fill="var(--ci-primary-color, currentColor)"
                                  d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z"
                                  className="ci-primary"></path>
                        </svg></h2>

                    :
                    <CSpinner color="info" style={{marginLeft: "45%"}}/>
            }

        </div>
    );
}
export default Accordions
