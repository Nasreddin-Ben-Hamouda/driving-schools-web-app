import React, {lazy, useEffect, useRef, useState} from 'react'
import UseForm from './UseForm'
import {
   CSpinner
} from '@coreui/react'
import axios from '../../../../axios/subscription-service'
import cogoToast from 'cogo-toast';

const agencyId="606f0dc7e3bf6a72dd524d4f";
const Configuration = () => {
    const [fields,setFields]=useState(null);
    useEffect(()=>{
        getAgency();

    },[])

    const getAgency=()=>{
        axios.get('/agency/'+agencyId)
            .then((response)=>{
                const agency= {
                    ...response.data,
                    cinDate:response.data.cinDate.slice(0,10),
                    taxRegistrationDate:response.data.taxRegistrationDate.slice(0,10)
                };
                setFields(agency);

            })
            .catch((error)=>{
                //todo handle error
                if(error.response.status===404){
                    //todo redirect them to the home page
                    cogoToast.error("agency not found",{position:"top-right"})
                }else {
                    cogoToast.error("Something went wrong",{position:"top-right"})
                }
            })
    }

    const onSubmit = (data)=>{
        delete data.state;
        delete data.licenceExpirationDate;
        delete data._id;
        delete data.__v;
        axios.put('/agency/'+agencyId,data)
             .then((response)=>{
                 cogoToast.success("Agency updated successfully",{position:"top-right"})
             })
             .catch((error)=>{
                 if(error.response.status===404){
                     //todo redirect them to the home page
                     cogoToast.error("agency not found",{position:"top-right"})
                 }else {
                     cogoToast.error("Something went wrong",{position:"top-right"})
                 }

             })
    };

  return fields?<UseForm preloadedValues={fields} onSubmit={onSubmit}/>:<CSpinner color="info" style={{marginLeft:"45%",marginTop:"15%"}} />
}

export default Configuration;
