import React,{useEffect,useState} from "react"
import { Redirect } from "react-router-dom";
import axios from "../../../../axios/auth-service"
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
import cogoToast from "cogo-toast";

import {
CSpinner
} from '@coreui/react'
import * as actions from "../../../../store/actions/common/User";
import {useDispatch} from "react-redux";

const Confirmation=(props)=> {
    // const dispatch = useDispatch();
    //
    // if(!localStorage.getItem('authToken')){
    //     dispatch(actions.logout())
    // }

    useEffect(() => {
        axios.get('/user/confirmation/' + props.match.params.tokenId)
            .then(() => {
                cogoToast.success("Your account confirmed successfully now you can login and enjoy", {position: "top-right"})
                props.history.push({pathname:"/"})
            })
            .catch(() => {
                props.history.push({pathname:"/"})
            })
    },[])

    return (
        <>

        </>

    )
}

export default withErrorHandler(Confirmation,axios)
