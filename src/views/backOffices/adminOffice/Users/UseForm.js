import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";


const reg = /^\d+$/;
const schema = yup.object().shape({
    fullName:yup.string().required("full name is a required field")
            .min(4,"full name must be at least 4 characters")
            .max(55,"full name must be at most 55 characters"),
    password:yup.string().required().min(8).max(255),
    email:yup.string().email().required(),
    phone:yup.string().required().min(8).max(12),
    agency:yup.string().required()
});
const UseForm = ({onSubmit,loading,agencies}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Full Name</label>
                        <input type="text" className="form-control"
                               style={errors.fullName ? inputBorderErrorsStyle : null} {...register("fullName")}
                               placeholder={"Enter the full name"}/>
                        <p style={errorsStyle}>{errors.fullName?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control"
                               style={errors.email ? inputBorderErrorsStyle : null} {...register("email")}
                               placeholder={"Enter your email"}/>
                        <p style={errorsStyle}>{errors.email?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Agency</label>
                        <select className="form-control"   style={errors.agency?inputBorderErrorsStyle:null} {...register("agency")} >
                            {agencies? agencies.map((agency,index)=>{
                                return (<option key={index}  value={agency._id}>{agency.title}</option>)
                            }):null}
                        </select>
                        <p style={errorsStyle}>{errors.agency?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="password" className="form-control"
                               style={errors.password ? inputBorderErrorsStyle : null} {...register("password")}
                               placeholder={"Enter your password"}/>
                        <p style={errorsStyle}>{errors.password?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="number" className="form-control"
                               style={errors.phone ? inputBorderErrorsStyle : null} {...register("phone")}
                               placeholder={"Enter your phone"}/>
                        <p style={errorsStyle}>{errors.phone?.message}</p>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Save
                    {loading && (
                        <CircularProgress style={{marginLeft: "10px", color: "white"}}

                                          size={20}
                        />
                    )}
                </button>
            </form>
        </>
    )
}

export default UseForm;
