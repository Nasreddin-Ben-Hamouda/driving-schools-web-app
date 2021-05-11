import React, {useEffect, useState} from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";

const schema = yup.object().shape({
    numexam:yup.string().required("exam number is a required field")
            .min(8,"exam number must be at least 8 characters")
            .max(18,"exam number must be at most 18 characters"),
    client:yup.string().required("customer is a required field"),
    monitor:yup.string().required("monitor is a required field"),
    car:yup.string().required("car is a required field"),
    examinateur:yup.string().required("examiner is a required field")
        .min(4,"examiner must be at least 4 characters")
        .max(55,"examiner must be at most 55 characters"),
    examDate:yup.string().required("exam date is a required field")

});
const UseForm = ({onSubmit,loading,clients,monitors,cars}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    return (
        <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Number</label>
                                <input type="text" className="form-control"     style={errors.numexam?inputBorderErrorsStyle:null} {...register("numexam")}  placeholder={"Enter exam number"}/>
                                <p style={errorsStyle}>{errors.numexam?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer</label>
                                <select className="form-control"  style={errors.client?inputBorderErrorsStyle:null} {...register("client")} >
                                    {clients? clients.map(client=>{
                                        return (<option key={client._id} value={client._id}>{client.surname+" "+client.name}</option>)
                                    }):null}
                                </select>
                                <p style={errorsStyle}>{errors.client?.message}</p>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Monitor</label>
                                <select className="form-control"  style={errors.monitor?inputBorderErrorsStyle:null} {...register("monitor")} >
                                    {monitors? monitors.map(monitor=>{
                                        return (<option key={monitor._id} value={monitor._id}>{monitor.surname+" "+monitor.name}</option>)
                                    }):null}
                                </select>
                                <p style={errorsStyle}>{errors.monitor?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Car</label>
                                <select className="form-control"   style={errors.car?inputBorderErrorsStyle:null} {...register("car")} >
                                    {cars? cars.map((car,index)=>{
                                        return (<option key={index}  value={car._id}>{car.mark+"-"+car.serialNum}</option>)
                                    }):null}
                                </select>
                                <p style={errorsStyle}>{errors.car?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Examiner</label>
                                <input type="text" className="form-control"  style={errors.examinateur?inputBorderErrorsStyle:null} {...register("examinateur")}  placeholder={"Enter the examiner"}/>
                                <p style={errorsStyle}>{errors.examinateur?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date</label>
                                <input type="date" className="form-control" min={new Date().toISOString().split("T")[0]} style={errors.examDate?inputBorderErrorsStyle:null} {...register("examDate") } />
                                <p style={errorsStyle}>{errors.examDate?.message}</p>
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
