import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";


const reg = /^\d+$/;
const schema = yup.object().shape({
    num:yup.string().required("number is a required field").length(17,"number must be exactly 17 characters"),
    mark:yup.string().required().min(2).max(12),
    model:yup.string().required().min(1).max(25),
    serialNum:yup.string().required("serial number is a required field").min(10,"serial number must be at least 10 characters").max(11,"serial number must be at most 11 characters"),
    dateFirstRegistration:yup.string().required("registration date is a required field"),
    exploitationCartDate:yup.string().required("exploitation date is a required field"),
    exploitationCartNum:yup.string().required("exploitation number is a required field").min(5,"exploitation number must be at least 4 characters").max(20,"exploitation number must be at most 10 characters"),

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
                    <div className="form-group col-md-4">
                        <label>Number</label>
                        <input type="text" className="form-control"     style={errors.num?inputBorderErrorsStyle:null} {...register("num")}  placeholder={"Enter the car number"}/>
                        <p style={errorsStyle}>{errors.num?.message}</p>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Mark</label>
                        <input type="text" className="form-control"     style={errors.mark?inputBorderErrorsStyle:null} {...register("mark")}  placeholder={"Enter the mark"}/>
                        <p style={errorsStyle}>{errors.mark?.message}</p>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Model</label>
                        <input type="text" className="form-control"     style={errors.model?inputBorderErrorsStyle:null} {...register("model")}  placeholder={"Enter the model"}/>
                        <p style={errorsStyle}>{errors.model?.message}</p>
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Serial Number</label>
                        <input type="text" className="form-control"    style={errors.serialNum?inputBorderErrorsStyle:null} {...register("serialNum")}  placeholder={"Enter the serial number"}/>
                        <p style={errorsStyle}>{errors.serialNum?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Registration Date</label>
                        <input type="date" className="form-control"   style={errors.dateFirstRegistration?inputBorderErrorsStyle:null}  {...register("dateFirstRegistration")} />
                        <p style={errorsStyle}>{errors.dateFirstRegistration?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Exploitation Date</label>
                        <input type="date" className="form-control"  style={errors.exploitationCartDate?inputBorderErrorsStyle:null} {...register("exploitationCartDate") } />
                        <p style={errorsStyle}>{errors.exploitationCartDate?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Exploitation Number</label>
                        <input type="text" className="form-control"  style={errors.exploitationCartNum?inputBorderErrorsStyle:null} {...register("exploitationCartNum")}  placeholder={"Enter the exp number"}/>
                        <p style={errorsStyle}>{errors.exploitationCartNum?.message}</p>
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
