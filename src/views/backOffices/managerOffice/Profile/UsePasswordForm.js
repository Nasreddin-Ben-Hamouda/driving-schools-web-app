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


const schema = yup.object().shape({
    oldPassword:yup.string()
        .required("old password is a required field")
        .min(8,"old password must be at least 8 characters")
        .max(255,"old password must be at most 255 characters"),
    newPassword:yup.string()
        .required("new password is a required field")
        .min(8,"new password must be at least 8 characters")
        .max(255,"new password must be at most 255 characters"),
    confirmPassword:yup.string()
        .oneOf([yup.ref('newPassword'), null], "passwords don't match")
        .required('confirm password is a required field')


});
const UsePasswordForm = ({onSubmit,loading}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <CCard>
                <CCardBody >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Old Password</label>
                                <input type="password" className="form-control"     style={errors.oldPassword?inputBorderErrorsStyle:null} {...register("oldPassword")} placeholder={"Enter your old password"} />
                                <p style={errorsStyle}>{errors.oldPassword?.message}</p>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>New Password</label>
                                <input type="password" className="form-control"     style={errors.newPassword?inputBorderErrorsStyle:null} {...register("newPassword")} placeholder={"Enter your new password"} />
                                <p style={errorsStyle}>{errors.newPassword?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control"     style={errors.confirmPassword?inputBorderErrorsStyle:null} {...register("confirmPassword")} placeholder={"Enter your confirm password"} />
                                <p style={errorsStyle}>{errors.confirmPassword?.message}</p>
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
                </CCardBody>

            </CCard>

        </>
    )
}

export default UsePasswordForm;
