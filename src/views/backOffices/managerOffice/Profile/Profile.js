import React, { useEffect, useState} from 'react'
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler"
import UseForm from './UseForm'
import UsePasswordForm from './UsePasswordForm'
import {
    CSpinner,
    CRow,
    CCol
} from '@coreui/react'
import axios from '../../../../axios/subscription-service'
import cogoToast from 'cogo-toast';
import AvatarUpload from "./AvatarUpload";

const agencyId="606f0dc7e3bf6a72dd524d4f";
const Profile = () => {
    const [fields,setFields]=useState(null);
    const [ loading,setLoading]=useState(false);
    useEffect(()=>{

    },[])

    const onSubmit = (data)=>{
        setLoading(true)
    };

    return (
        <>
            <CRow>
                <AvatarUpload/>
            </CRow>
            <CRow>
                <CCol xs="12" sm="12" md="6">
                        <UseForm  loading={loading} onSubmit={onSubmit}/>
                </CCol>
                <CCol xs="12" sm="12" md="6">
                        <UsePasswordForm loading={loading} onSubmit={onSubmit}/>
                </CCol>

            </CRow>
        </>


        )
}

export default withErrorHandler(Profile,axios);
