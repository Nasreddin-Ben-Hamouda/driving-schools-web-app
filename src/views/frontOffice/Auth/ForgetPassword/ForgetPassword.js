import React, { useState,useRef} from "react";
import { Grid, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import img from "../../../../assets/frontOffice/img/illustartions/dreamer.svg"


const ForgotPassword=(props)=> {
    const [useForm,setForm]=useState({
        email: ""
    });
    const handleChange = event => {
        event.persist();
        setForm({
            email:event.target.value
        })
    };
    const handleFormSubmit = () => {
        //props.resetPassword({ ...this.state });
        console.log("reset")
    };

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
                                        <Button className="capitalize" style={{backgroundColor:"#2e186a",color:"white"}} type="submit">
                                            Reset Password
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

export default ForgotPassword;
