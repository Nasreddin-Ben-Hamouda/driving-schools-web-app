import React, {useState, useRef, Fragment, useEffect} from "react";
import "../../../../styles/frontOffice/Auth/_app.scss";
import {Checkbox,FormControlLabel,Grid,Button,Chip,CircularProgress} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import DividerWithText from "../../../../components/frontOffice/UI/DividerWithText/DividerWithText";
import img from "../../../../assets/backOffices/img/illustrations/business_deal.svg"
import googleSVG from "../../../../assets/backOffices/img/logos/google.svg"
import axios from "../../../../axios/login-register-auth-service"
import cogoToast from "cogo-toast";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
const Register=(props)=>{
    const [useForm,setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        agreement: true,
        loading:false
    })
    let { fullName, email, password,phone,agreement,loading } = useForm;


    useEffect(()=>{
        return ()=>{
            //clearTimeout(timer)
        }
    },[])
    const handleChange = event => {
        event.persist();
        if(event.target.name==="agreement"){
            setForm({
                ...useForm,
                [event.target.name]: !useForm.agreement
            });
        }else{
            setForm({
                ...useForm,
                [event.target.name]: event.target.value
            });
        }
    };
    const handleFormSubmit = event => {
        if(agreement){
            setForm({
                ...useForm,
                loading: true
            })
            let user={
                fullName:useForm.fullName,
                email:useForm.email,
                password:useForm.password,
                phone:useForm.phone,
            };
            axios.post('/user',user)
                .then(()=>{
                    setForm({
                        ...useForm,
                        loading: false
                    });
                    props.close();
                    cogoToast.warn("You are registered successfully now you should confirm your account", {position: "top-right"})
                })
                .catch(()=>{
                    setForm({
                        ...useForm,
                        loading: false
                    })
                })
        }

    };
    const buttonStyle=!loading?{backgroundColor:"#2e186a",color:"white"}: null
    const agreementStyle=agreement? {color: "#2e186a"}:{color: "#f44336"};
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
                                    Sign Up With Google
                                </Button>

                                <DividerWithText><Chip label="OR"/></DividerWithText>
                            </div>
                            <div className="p-9 h-full">
                                <ValidatorForm ref={useRef('form')} onSubmit={handleFormSubmit}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Full Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="fullName"
                                        value={fullName}
                                        validators={["required","minStringLength: 4","maxStringLength: 30"]}
                                        errorMessages={
                                            [
                                                "this field is required",
                                                "this field must be longer than 3 characters",
                                                "this field must not exceed 30 characters"
                                            ]
                                        }
                                    />
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
                                        validators={["required","minStringLength: 7","maxStringLength: 20"]}
                                        errorMessages={
                                            [
                                                "this field is required",
                                                "this field must be longer than 6 characters",
                                                "this field must not exceed 15 characters"
                                            ]
                                        }
                                    />
                                    <TextValidator
                                        className="mb-4 w-full"
                                        label="Phone"
                                        variant="outlined"
                                        onChange={handleChange}
                                        name="phone"
                                        type="number"
                                        value={phone}
                                        validators={["required","minStringLength: 8","maxStringLength: 12"]}
                                        errorMessages={
                                            [
                                                "this field is required",
                                                "this field must be longer than 8 characters",
                                                "this field must not exceed 12 characters"
                                            ]
                                        }
                                    />
                                    <FormControlLabel
                                        className="mb-4"
                                        name="agreement"
                                        onChange={handleChange}
                                        control={<Checkbox checked={agreement} style={agreementStyle}/>}
                                        label="I agree to the terms of service."
                                    />
                                    <div className="flex items-center">
                                        <Button
                                            className="capitalize"
                                            variant="contained"
                                            style={buttonStyle}
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign up
                                               {loading && (
                                                   <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                       size={20}
                                                   />
                                               )}

                                        </Button>

                                        <span className="mx-2 ml-5">or</span>
                                        <Button
                                            className="capitalize"
                                            onClick={() =>props.open('login')
                                            }
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

/*const mapStateToProps = state => ({
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    login: state.login
});*/
export default withErrorHandler(Register,axios);
