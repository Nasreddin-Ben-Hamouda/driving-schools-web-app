import React,{useState,useRef,useEffect,lazy} from "react";
import "../../../../styles/frontOffice/Auth/_app.scss";
import { Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons"
import { Grid, Button, CircularProgress} from "@material-ui/core";
import { TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import img from "../../../../assets/frontOffice/img/illustartions/posting_photo.svg"
import axios from "../../../../axios/login-register-auth-service"
import cogoToast from "cogo-toast";
import {useDispatch,useSelector} from "react-redux";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
import IntroContent from "../../../../content/frontOffice/IntroContent.json";
const Container = lazy(() => import("../../../../components/frontOffice/UI/Container"));
const Layout = lazy(() => import("../../../../hoc/frontOffice/Layout"));
const ContentBlock = lazy(() => import("../../../../components/frontOffice/ContentBlock"));

const ForgotPassword=(props)=> {

    const [useForm,setForm]=useState({
        newPassword:"",
        confirmPassword:"",
        loading:false
    });
    let { newPassword,confirmPassword,loading } = useForm;
    const user = useSelector(state => state.user.user);
    if(user) {
        cogoToast.warn("You are already connected", {position: "top-right"})
        props.history.push('/')
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !==newPassword) {
                return false;
            }
            return true;
        });
        return ()=>{
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    },[useForm])
    const handleChange = event => {
        event.persist();
        setForm({
            ...useForm,
            [event.target.name]: event.target.value
        })
    };
    const handleFormSubmit = () => {
        setForm({
            ...useForm,
            loading: true
        })
        const data={
            newPassword:newPassword,
            confirmPassword: confirmPassword
        }
        axios.post('/user/resetPassword/'+props.match.params.tokenId,data)
            .then(()=>{
                setForm({
                    ...useForm,
                    loading: false
                });
                cogoToast.success("The password updated successfully", {position: "top-right"})
                props.history.push('/')
            })
            .catch(()=>{
                setForm({
                    ...useForm,
                    loading: false
                })
            })
    };
    const buttonStyle=!loading?{backgroundColor:"#2e186a",color:"white"}: null

    return (
        <Layout>
            <Container>
                <Modal
                    centered
                    visible={true}
                    width={800}
                    footer={null}
                    destroyOnClose={true}
                    style={{marginTop:"1%"}}
                    closeIcon={<CloseOutlined style={{fontSize:"22px"}}/>}
                >
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>

                            <div className="p-8 flex justify-center items-center h-full">

                                <img
                                    src={img}
                                    alt=""
                                />

                            </div>

                        </Grid>

                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full">
                                <ValidatorForm ref={useRef('form')} onSubmit={handleFormSubmit}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="New Password"
                                        onChange={handleChange}
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        validators={["required","minStringLength: 7","maxStringLength: 15"]}
                                        errorMessages={
                                            [
                                                "this field is required",
                                                "this field must be longer than 6 characters",
                                                "this field must not exceed 15 characters"
                                            ]
                                        }
                                    />
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Confirmation Password"
                                        onChange={handleChange}
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        validators={["required","minStringLength: 7","maxStringLength: 15","isPasswordMatch"]}
                                        errorMessages={
                                            [
                                                "this field is required",
                                                "this field must be longer than 6 characters",
                                                "this field must not exceed 15 characters",
                                                "password mismatch"
                                            ]
                                        }
                                    />

                                    <div className="flex items-center">
                                        <Button
                                            className="capitalize"
                                            variant="contained"
                                            style={buttonStyle}
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Reset
                                            {loading && (
                                                <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                                  size={20}
                                                />
                                            )}

                                        </Button>
                                        <span className="mx-2 ml-5">or</span>
                                        <Button
                                            className="capitalize"
                                            onClick={()=>props.history.push({pathname:"/"})}
                                        >
                                            Home
                                        </Button>
                                    </div>
                                    <br/>
                                </ValidatorForm>
                            </div>

                        </Grid>
                    </Grid>
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

            </Container>
        </Layout>

    );

}

export default withErrorHandler(ForgotPassword,axios);
