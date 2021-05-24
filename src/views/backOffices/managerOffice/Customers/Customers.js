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
import {useSelector} from "react-redux";
const Customers = (props) => {
    const agencyId=useSelector(state=>state.user.user.agency);
    const [clients, setClients] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllCustomers()
    }, []);
    const getAllCustomers = () => {

        axios.get('/client/' + agencyId)
            .then((response) => {
                setClients(response.data);
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

        {key: 'surname', label: "First Name", _style: {width: '20%'}},
        {key: 'name', label: "Last Name", _style: {width: '20%'}},
        {key: 'email', _style: {width: '30%'}},
        {key: 'cin', _style: {width: '20%'}},
        {key: 'birthday', _style: {width: '20%'}},
        {key: 'phone', _style: {width: '20%'}},
        {key: 'address', _style: {width: '20%'}},
        {key: 'state', _style: {width: '20%'}},
        {
            key: 'show_details',
            label: 'Actions',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }
    ]
    const getBadge = (state) => {
        switch (state) {
            case 'READY':
                return 'success'
            case 'LEARNING':
                return 'success'
            case 'INACTIVE':
                return 'secondary'
            case 'UNVERIFIED':
                return 'warning'
            case 'PROFILE_NOT_COMPLETED':
                return 'warning'
            case 'SUSPENDED':
                return 'danger'
            case 'RETIRED':
                return 'danger'
            case 'DRIVING':
                return 'primary'
            default:
                return 'primary'
        }
    }


    const onSubmitAddForm = (data,e) => {
        setLoading(true)
        data = {
            ...data,
            agency: agencyId
        }
        axios.post('/client', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Customer added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllCustomers()
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
            ...data,
            agency: agencyId
        }
        const id = data._id;
        delete data.password;
        delete data.state;
        delete data.hasPack;
        delete data._id
        axios.put('/client/' + id, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Customer updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllCustomers()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = clients.findIndex((client) => client._id === id);
        const client={
            ...clients[index],
            birthday:clients[index].birthday.slice(0,10),
            cinDate: clients[index].cinDate.slice(0,10)
        }
        setFormUpdate(client)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        const data={
            agency:agencyId
        }
        axios.delete('/client/' + id,{data:data})
            .then(() => {
                cogoToast.success("Customer deleted successfully", {position: "top-right"})
                getAllCustomers()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    const suspendCustomerHandler=(id)=>{
        const data={
            agency:agencyId
        }
        axios.put('/client/suspended/' + id,data)
            .then(() => {
                cogoToast.success("Customer suspended successfully", {position: "top-right"})
                getAllCustomers()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !clients ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Customer" : "Update Customer"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    formUpdate ?
                                        <UseFormUpdate loading={loading} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :
                                        <UseForm loading={loading} onSubmit={onSubmitAddForm}/>
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
                                    items={clients}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'state':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getBadge(item.state)}>
                                                        {item.state}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'birthday':
                                            (item) => (
                                                <td>
                                                    {item.birthday.slice(0, 10)}
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

export default withErrorHandler(Customers,axios);
