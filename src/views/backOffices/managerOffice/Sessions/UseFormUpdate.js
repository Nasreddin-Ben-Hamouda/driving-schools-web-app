import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";

const schema = yup.object().shape({
    client:yup.string().required("customer is a required field"),
    monitor:yup.string().required("monitor is a required field"),
    car:yup.string().required("car is a required field"),
    startDate:yup.date("start date is a required field").typeError("start date is a required field"),
    endDate:yup.date().min(yup.ref('startDate'),"end date must be later than start date").typeError("end date is a required field")

});
const UseFormUpdate = ({preloadedValues,onSubmit,loading,clients,monitors,cars}) => {

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
                        <label>Customer</label>
                        <select className="form-control"  style={errors.client?inputBorderErrorsStyle:null} {...register("client")} >
                            {clients? clients.map(client=>{
                                return (<option key={client._id} value={client._id}>{client.surname+" "+client.name}</option>)
                            }):null}
                        </select>
                        <p style={errorsStyle}>{errors.client?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Monitor</label>
                        <select className="form-control"  style={errors.monitor?inputBorderErrorsStyle:null} {...register("monitor")} >
                            {monitors? monitors.map(monitor=>{
                                return (<option key={monitor._id} value={monitor._id}>{monitor.surname+" "+monitor.name}</option>)
                            }):null}
                        </select>
                        <p style={errorsStyle}>{errors.monitor?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
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
                        <label>Start Date</label>
                        <input type="datetime-local" className="form-control" min={new Date().toISOString().substring(0,16)} style={errors.startDate?inputBorderErrorsStyle:null} {...register("startDate")} />
                        <p style={errorsStyle}>{errors.startDate?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>End Date</label>
                        <input type="datetime-local" className="form-control" min={new Date().toISOString().substring(0,16)} style={errors.endDate?inputBorderErrorsStyle:null} {...register("endDate") } />
                        <p style={errorsStyle}>{errors.endDate?.message}</p>
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
