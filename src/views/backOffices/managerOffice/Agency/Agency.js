import React, { useEffect, useState} from 'react'
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler"
import UseForm from './UseForm'
import axios from '../../../../axios/subscription-service'
import cogoToast from 'cogo-toast';
import {useDispatch} from "react-redux"
import * as actions from "../../../../store/actions/common/User"
const Agency = () => {
    const [ loading,setLoading]=useState(false);
    const dispatch = useDispatch()
    const onSubmit = (data)=>{
        setLoading(true)
        axios.post('/agency',data)
            .then((response)=>{
                cogoToast.success("Congratulations your agency added successfully",{position:"top-right"})
                setLoading(false)
                dispatch(actions.updateUser(response.data))
            })
            .catch((error)=>{
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            })
    };

    return (<UseForm loading={loading} onSubmit={onSubmit}/>)
}

export default withErrorHandler(Agency,axios);
