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
    surname:yup.string().required("first name is a required field")
        .min(4,"first name must be at least 4 characters")
        .max(55,"first name must be at most 55 characters"),
    name:yup.string().required("last name is a required field")
        .min(4,"last name must be at least 4 characters")
        .max(55,"last name must be at most 55 characters"),
    cin:yup.string().matches(reg,"cin must be a number").required().length(8),
    cinDate:yup.string().required("cin date is a required field"),
    phone:yup.string().required().min(8).max(12),
    address:yup.string().min(5).max(255),
    postalCode:yup.string().matches(reg,"zip code must be a number").min(4,"zip code must be at least 4 characters").max(10,"zip code must be at most 10 characters"),
    birthday:yup.string().required()

});
const UseFormUpdate = ({preloadedValues,onSubmit,loading}) => {

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
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" className="form-control"     style={errors.surname?inputBorderErrorsStyle:null} {...register("surname")}  placeholder={"Enter your first name"}/>
                        <p style={errorsStyle}>{errors.surname?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" className="form-control"     style={errors.name?inputBorderErrorsStyle:null} {...register("name")}  placeholder={"Enter your last name"}/>
                        <p style={errorsStyle}>{errors.name?.message}</p>
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Cin Number</label>
                        <input type="number" className="form-control"    style={errors.cin?inputBorderErrorsStyle:null} {...register("cin")}  placeholder={"Enter your cin number"}/>
                        <p style={errorsStyle}>{errors.cin?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Cin Date</label>
                        <input type="date" className="form-control"   style={errors.cinDate?inputBorderErrorsStyle:null}  {...register("cinDate")} />
                        <p style={errorsStyle}>{errors.cinDate?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Birthday</label>
                        <input type="date" className="form-control" max={new Date().getFullYear()-18+"-12-31"} style={errors.birthday?inputBorderErrorsStyle:null} {...register("birthday") } />
                        <p style={errorsStyle}>{errors.birthday?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="number" className="form-control"  style={errors.phone?inputBorderErrorsStyle:null} {...register("phone")}  placeholder={"Enter your phone"}/>
                        <p style={errorsStyle}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Zip Code</label>
                        <input type="text" className="form-control"  style={errors.postalCode?inputBorderErrorsStyle:null} {...register("postalCode")} placeholder={"Enter your zip code"}/>
                        <p style={errorsStyle}>{errors.postalCode?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Address</label>
                        <input type="text" className="form-control"   style={errors.address?inputBorderErrorsStyle:null} {...register("address")} placeholder={"Enter your address"}/>
                        <p style={errorsStyle}>{errors.address?.message}</p>
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

export default UseFormUpdate;
