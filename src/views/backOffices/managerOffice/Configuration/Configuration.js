import React, { useEffect, useState} from 'react'
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler"
import UseForm from './UseForm'
import {
   CSpinner
} from '@coreui/react'
import axios from '../../../../axios/subscription-service'
import cogoToast from 'cogo-toast';
import {useSelector} from "react-redux";

const Configuration = () => {
    const agencyId=useSelector(state=>state.user.user.agency);
    const [fields,setFields]=useState(null);
    const [ loading,setLoading]=useState(false);
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
                //all errors handled in withErrorHandler hoc component
            })
    }

    const onSubmit = (data)=>{
        setLoading(true)
        delete data.state;
        delete data.licenceExpirationDate;
        delete data._id;
        delete data.__v;
        axios.put('/agency/'+agencyId,data)
             .then((response)=>{
                 cogoToast.success("Agency updated successfully",{position:"top-right"})
                 setLoading(false)
             })
             .catch((error)=>{
                 setLoading(false)
                 //all errors handled in withErrorHandler hoc component
             })
    };

  return fields?<UseForm preloadedValues={fields} loading={loading} onSubmit={onSubmit}/>:<CSpinner color="info" style={{marginLeft:"45%",marginTop:"15%"}} />
}

export default withErrorHandler(Configuration,axios);
