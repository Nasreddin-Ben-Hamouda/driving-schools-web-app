import React from "react"
import {
    CCard,
    CCardBody,
} from '@coreui/react'
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";


const reg = /^\d+$/;
const schema = yup.object().shape({
    title: yup.string().required().min(4).max(55),
    cin:yup.string().matches(reg,"cin must be a number").required().length(8),
    cinDate:yup.string().required("cin date is a required field"),
    email:yup.string().email().required(),
    phone:yup.string().required().min(8).max(12),
    region:yup.string().required(),
    address:yup.string().required().min(5).max(255),
    postalCode:yup.string().required().matches(reg,"zip code must be a number").min(4,"zip code must be at least 4 characters").max(10,"zip code must be at most 10 characters"),
    taxRegistrationNum:yup.string().required("tax registration num is a required field").length(9,"tax registration num must be exactly 9 characters"),
    taxRegistrationDate:yup.string().required("tax registration date is a required field")

});
const UseForm = ({onSubmit,preloadedValues,loading}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:preloadedValues,
        resolver: yupResolver(schema)
    });

    return (
        <>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Title</label>
                                <input type="text" className="form-control"     style={errors.title?inputBorderErrorsStyle:null} {...register("title")}  placeholder={"Enter your title"}/>
                                <p style={errorsStyle}>{errors.title?.message}</p>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Cin number</label>
                                <input type="number" className="form-control"    style={errors.cin?inputBorderErrorsStyle:null} {...register("cin")}  placeholder={"Enter your cin number"}/>
                                <p style={errorsStyle}>{errors.cin?.message}</p>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Cin Date</label>
                                <input type="date" className="form-control"   style={errors.cinDate?inputBorderErrorsStyle:null}  {...register("cinDate")} />
                                <p style={errorsStyle}>{errors.cinDate?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control"   style={errors.email?inputBorderErrorsStyle:null} {...register("email")}  placeholder={"Enter your email"}/>
                                <p style={errorsStyle}>{errors.email?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input type="number" className="form-control"  style={errors.phone?inputBorderErrorsStyle:null} {...register("phone")}  placeholder={"Enter your phone"}/>
                                <p style={errorsStyle}>{errors.phone?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Region</label>
                                <input type="text" className="form-control"  style={errors.region?inputBorderErrorsStyle:null} {...register("region")}  placeholder={"Enter your region"}/>
                                <p style={errorsStyle}>{errors.region?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input type="text" className="form-control"   style={errors.address?inputBorderErrorsStyle:null} {...register("address")} placeholder={"Enter your address"}/>
                                <p style={errorsStyle}>{errors.address?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Zip Code</label>
                                <input type="text" className="form-control"  style={errors.postalCode?inputBorderErrorsStyle:null} {...register("postalCode")} placeholder={"Enter your zip code"}/>
                                <p style={errorsStyle}>{errors.postalCode?.message}</p>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Tax Number </label>
                                <input type="text" className="form-control"  style={errors.taxRegistrationNum?inputBorderErrorsStyle:null} {...register("taxRegistrationNum")}  placeholder={"Enter your tax registration number"}/>
                                <p style={errorsStyle}>{errors.taxRegistrationNum?.message}</p>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Tax Date</label>
                                <input type="date" className="form-control"  style={errors.taxRegistrationDate?inputBorderErrorsStyle:null} {...register("taxRegistrationDate") } />
                                <p style={errorsStyle}>{errors.taxRegistrationDate?.message}</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} >Save
                            {loading && (
                                <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                  size={20}
                                />
                            )}
                        </button>
                    </form>

        </>
    )
}

export default UseForm;
