import React, { useEffect, useState} from 'react'
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler"
import {
    CBadge,
    CButton,
    CCardBody,
    CDataTable,
    CCollapse,
    CCard,CCardHeader,
    CModal,CModalBody,CModalHeader,CSpinner
} from '@coreui/react'
import AddBoxIcon from '@material-ui/icons/AddBox';
import UseForm from "./UseForm";
import UseFormUpdate from "./UseFormUpdate";
import axios from "../../../../axios/subscription-service";
import cogoToast from "cogo-toast";
import { Popconfirm } from 'antd';
import "antd/dist/antd.css";

const Users = (props) => {
    const [users, setUsers] = useState(null);
    const [agencies, setAgencies] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllUsers()
        getAllAgencies()
    }, []);
    const getAllUsers = () => {

        axios.get('/admin/users')
            .then((response) => {
                console.log(response.data)
                setUsers(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const getAllAgencies = () => {
        axios.get('/admin/agencies' )
            .then((response) => {
                setAgencies(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const modalCloseHandle = () => {
        setFormUpdate(null)
        setVisible(false);
    }
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails);
    }


    const fields = [

        {key: 'fullName', label: "Full Name", _style: {width: '20%'}},
        {key: 'email', _style: {width: '30%'}},
        {key: 'phone', _style: {width: '20%'}},
        {key: 'agency', _style: {width: '20%'}},
        {key: 'isActive',label:"State", _style: {width: '20%'}},
        {key: 'isConfirmed', label:"Confirmation",_style: {width: '20%'}},
        {
            key: 'show_details',
            label: 'Actions',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }
    ]
    const getActiveBadge = (state) => {
        switch (state) {
            case true:
                return 'success'
            case false:
                return 'danger'
            default:
                return 'primary'
        }
    }
    const getConfirmationBadge = (state) => {
        switch (state) {
            case true:
                return 'success'
            case false:
                return 'warning'
            default:
                return 'primary'
        }
    }


    const onSubmitAddForm = (data,e) => {
        setLoading(true)
        data = {
            ...data,
        }
        axios.post('/admin/users', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("User added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllUsers()
            })
            .catch((error) => {

                if(error && error.response && error.response.status===300){
                    console.log(error.response.data)
                }
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const onSubmitUpdateForm = (data) => {
        setLoading(true)
        data = {
            _id: data._id,
            fullName: data.fullName,
            email: data.email,
            agency: data.agency,
            phone: data.phone
        }
        const id = data._id;
        delete data._id;
        axios.put('/admin/users/' + id, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("User updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllUsers()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = users.findIndex((user) => user._id === id);
        const user={
            ...users[index],
            agency:users[index].agency?users[index].agency._id:null
        }
        setFormUpdate(user)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        axios.delete('/admin/users/' + id)
            .then(() => {
                cogoToast.success("User deleted successfully", {position: "top-right"})
                getAllUsers()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    const suspendCustomerHandler=(id)=>{
        axios.put('/admin/users/suspended/' + id)
            .then(() => {
                cogoToast.success("User suspended successfully", {position: "top-right"})
                getAllUsers()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !users || !agencies ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add User" : "Update User"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    formUpdate ?
                                        <UseFormUpdate loading={loading} agencies={agencies} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :
                                        <UseForm loading={loading} agencies={agencies} onSubmit={onSubmitAddForm}/>
                                }
                            </CModalBody>
                        </CModal>
                        <CCard>
                            <CCardHeader>
                                <CButton style={{float: "right"}} color="info"
                                         onClick={() => setVisible(true)}>
                                    <AddBoxIcon />
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={users}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'agency':
                                            (item) => (
                                                <td>
                                                        {item.agency? item.agency.title:(  <h2 style={{marginLeft:"35%"}}><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                                                                                                        className="c-icon c-icon-custom-size text-danger mb-2" role="img">
                                                            <path fill="var(--ci-primary-color, currentColor)"
                                                                  d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z"
                                                                  className="ci-primary"></path>
                                                        </svg></h2>)}
                                                </td>
                                            ),
                                        'isActive':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getActiveBadge(item.isActive)}>
                                                        {item.isActive? "ACTIVE":"SUSPENDED"}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'isConfirmed':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getConfirmationBadge(item.isConfirmed)}>
                                                        {item.isConfirmed? "CONFIRMED":"NOT CONFIRMED"}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'show_details':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2">
                                                        <CButton
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => {
                                                                toggleDetails(index)
                                                            }}
                                                        >
                                                            {details.includes(index) ? 'Hide' : 'Show'}
                                                        </CButton>
                                                    </td>
                                                )
                                            },
                                        'details':
                                            (item, index) => {
                                                return (
                                                    <CCollapse show={details.includes(index)}>
                                                        <CCardBody>
                                                            <CButton size="sm" style={{width: "6%"}} color="info"
                                                                     onClick={() => showUpdateForm(item._id)}>
                                                                Edit
                                                            </CButton>
                                                            <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => deleteCustomerHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="danger" className="ml-1">
                                                                    Delete
                                                                </CButton>
                                                            </Popconfirm>
                                                            <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => suspendCustomerHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="warning" className="ml-1">
                                                                    Suspend
                                                                </CButton>
                                                            </Popconfirm>
                                                        </CCardBody>
                                                    </CCollapse>
                                                )
                                            }
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </>
            }
        </>
    )
}

export default withErrorHandler(Users,axios);
