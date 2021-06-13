import React, { useState,useRef} from "react";
import {Grid, Button, CircularProgress} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import img from "../../../../assets/frontOffice/img/illustartions/dreamer.svg"
import axios from "../../../../axios/login-register-auth-service";
import cogoToast from "cogo-toast";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";


const ForgotPassword=(props)=> {
    const [useForm,setForm]=useState({
        email: "",
        loading:false
    });
    let {  email,loading } = useForm;
    const handleChange = event => {
        event.persist();
        setForm({
            ...useForm,
            email:event.target.value
        })
    };
    const handleFormSubmit = () => {
        setForm({
            ...useForm,
            loading: true
        })
        const data={
            email:email
        }
        axios.post('/user/forgotPassword',data)
            .then(()=>{
                setForm({
                    ...useForm,
                    loading: false
                });
                props.close();
                cogoToast.warn("The password reset mail sent to you,check it", {position: "top-right"})
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

                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <div className="p-8 flex justify-center items-center h-full">
                                <img src={img} alt="" />
                            </div>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full position-relative">
                                <ValidatorForm ref={useRef('form')} onSubmit={handleFormSubmit}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Email"
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        value={useForm.email}
                                        validators={["required", "isEmail"]}
                                        errorMessages={[
                                            "this field is required",
                                            "email is not valid"
                                        ]}
                                    />
                                    <div className="flex items-center">
                                        <Button
                                            className="capitalize"
                                            variant="contained"
                                            style={buttonStyle}
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Reset Password
                                            {loading && (
                                                <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                                  size={20}
                                                />
                                            )}

                                        </Button>

                                        <span className="ml-4 mr-2">or</span>
                                        <Button
                                            className="capitalize"
                                            onClick={() =>props.open('login')}
                                        >
                                            Sign in
                                        </Button>
                                    </div>
                                </ValidatorForm>
                            </div>
                        </Grid>
                    </Grid>

    );

}

export default withErrorHandler(ForgotPassword,axios);
