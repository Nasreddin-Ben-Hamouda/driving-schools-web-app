import React, { useEffect, useState} from 'react'
import { saveAs } from "file-saver";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler"
import UseForm from './UseForm'
import UsePasswordForm from './UsePasswordForm'
import {
    CSpinner,
    CRow,
    CCol,
    CCard
} from '@coreui/react'
import axios from '../../../../axios/subscription-service'
import cogoToast from 'cogo-toast';
import UserCard from "./UserCard";
import {useDispatch,useSelector} from "react-redux";
import * as actions from "../../../../store/actions/common/User"
const Profile = () => {
    const dispatch= useDispatch()
    const userState=useSelector(state=>state.user.user);
    const [user, setUser] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
            getUser()
    }, [])
    const getUser = () => {
        axios.get('/user/' + userState._id)
            .then((response) => {
                //console.log(response.data)
                setUser(response.data)
            })

    }
    const onSubmitFormInformation = (data) => {
        setLoadingInfo(true)
        axios.put('/user/'+userState._id,data)
             .then((response)=>{
                 cogoToast.success("Profile updated successfully", {position: "top-right"})
                 setLoadingInfo(false);
                 dispatch(actions.updateUser(response.data));
             })
            .catch(()=>{
                setLoadingInfo(false);
            })
    };
    const onSubmitFormPassword = (data) => {
        setLoadingPassword(true)
        axios.put('/user/password/'+userState._id,data)
            .then((response)=>{
                cogoToast.success("Password updated successfully", {position: "top-right"})
                setLoadingPassword(false);
                dispatch(actions.updateUser(response.data));
            })
            .catch(()=>{
                setLoadingPassword(false);
            })
    };
    const onChangeImageHandler=(event)=>{
        //cogoToast.error(event.target.files[0].size, {position: "top-right"})
        if(event.target.files[0]){
            const file = event.target.files[0];
            if (file.size > 1024000)
                cogoToast.error("Image size cannot exceed more than 1MB", {position: "top-right"})
            else{
                setSelectedFile(event.target.files[0]);
                const data = new FormData();
                data.append('file', event.target.files[0])
                axios.put('/user/updateAvatar/'+userState._id,data)
                    .then((response)=>{
                        cogoToast.success("Avatar updated successfully", {position: "top-right"})
                        dispatch(actions.updateUser(response.data));
                    })

            }
        }

    }
    return (
        <>
            {
                user ?

                    <CCard style={{borderRadius: "20px"}}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12">
                                <UserCard change={onChangeImageHandler} image={selectedFile} avatar={user.avatar}/>
                            </CCol>
                        </CRow>

                        <CRow style={{marginLeft: "1%", marginRight: "1%", marginTop: "5%"}}>

                            <CCol xs="12" sm="12" md="6">
                                <UseForm
                                    preloadedValues={{fullName: user.fullName, email: user.email, phone: user.phone}}
                                    loading={loadingInfo} onSubmit={onSubmitFormInformation}/>
                            </CCol>
                            <CCol xs="12" sm="12" md="6">
                                <UsePasswordForm loading={loadingPassword} onSubmit={onSubmitFormPassword}/>
                            </CCol>


                        </CRow>
                    </CCard>

                    :
                    <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
            }
        </>
    )
}

export default withErrorHandler(Profile,axios);
