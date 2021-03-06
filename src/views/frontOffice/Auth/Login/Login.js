import React,{useState,useRef,useEffect,Fragment} from "react";
import "../../../../styles/frontOffice/Auth/_app.scss";
import {Checkbox, FormControlLabel, Grid, Button, Chip, CircularProgress} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import DividerWithText from "../../../../components/frontOffice/UI/DividerWithText/DividerWithText";
import img from "../../../../assets/frontOffice/img/illustartions/posting_photo.svg"
import googleSVG from "../../../../assets/backOffices/img/logos/google.svg"
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../store/actions/common/User";
import axios from "../../../../axios/login-register-auth-service"
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
const Login=(props)=>{
    const [useForm,setForm] = useState({
        email: "",
        password: "",
        remember: false
    })
    let { email, password ,remember} = useForm;
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.loading)

    const handleChange = event => {
           event.persist();
           if(event.target.name==="remember"){
               setForm({
                   ...useForm,
                   [event.target.name]: !useForm.remember
               });
           }else{
               setForm({
                   ...useForm,
                   [event.target.name]: event.target.value
               });
           }

    };
    const handleFormSubmit = ()=> {
        dispatch(actions.login(useForm.email,useForm.password));

    };
    const buttonStyle=!loading?{backgroundColor:"#2e186a",color:"white"}: null
    return (
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

                                <div className="px-8 pt-8">
                                    <Button className="mb-6 w-full capitalize" variant="contained" onClick={props.googleSigIn}>
                                            <img src={googleSVG} alt="" style={{width:"6%",height:"6%",marginRight:"4%"}}/>
                                        Sign In With Google
                                    </Button>
                                    <DividerWithText><Chip label="OR"/></DividerWithText>
                                </div>
                                <div className="p-9 h-full">
                                    <ValidatorForm ref={useRef('form')} onSubmit={handleFormSubmit}>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Email"
                                            onChange={handleChange}
                                            type="email"
                                            name="email"
                                            value={email}
                                            validators={["required", "isEmail"]}
                                            errorMessages={[
                                                "this field is required",
                                                "email is not valid"
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="password"
                                            type="password"
                                            value={password}
                                            validators={["required","minStringLength: 7","maxStringLength: 15"]}
                                            errorMessages={
                                                [
                                                    "this field is required",
                                                    "this field must be longer than 6 characters",
                                                    "this field must not exceed 15 characters"
                                                ]
                                            }
                                        />

                                        <FormControlLabel
                                            className="mb-4"
                                            name="remember"
                                            onChange={handleChange}
                                            control={<Checkbox checked={remember} style={{color:"#2e186a"}} />}
                                            label="Remember me."
                                        />
                                        <div className="flex items-center">
                                            <Button
                                                className="capitalize"
                                                variant="contained"
                                                style={buttonStyle}
                                                disabled={loading}
                                                type="submit"
                                            >
                                                Sign in
                                                {loading && (
                                                    <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                                      size={20}
                                                    />
                                                )}

                                            </Button>
                                            <span className="mx-2 ml-5">or</span>
                                            <Button
                                                className="capitalize"
                                                onClick={()=>props.open('register')}
                                            >
                                                Sign up
                                            </Button>
                                        </div>
                                        <br/>
                                        <a onClick={()=>props.open('forgotPassword')} style={{color:"#2e186a"}}>
                                             Forgot password?
                                        </a>
                                    </ValidatorForm>
                                </div>

                            </Grid>
                        </Grid>


        );

}

export default withErrorHandler(Login,axios);
