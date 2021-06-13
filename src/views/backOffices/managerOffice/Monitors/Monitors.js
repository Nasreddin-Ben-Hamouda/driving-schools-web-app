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
import axios from "../../../../axios/scheduling-service";
import cogoToast from "cogo-toast";
import { Popconfirm } from 'antd';
import "antd/dist/antd.css";
import {useSelector} from "react-redux";
const Monitors = (props) => {
    const agencyId = useSelector(state => state.user.user.agency);
    const [monitors, setMonitors] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllMonitors()
    }, []);
    const getAllMonitors = () => {
        axios.get('/monitor/' + agencyId)
            .then((response) => {
                setMonitors(response.data);
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
        {key: 'cin', _style: {width: '20%'}},
        {key: 'birthday', _style: {width: '20%'}},
        {key: 'phone', _style: {width: '20%'}},
        {key: 'address', _style: {width: '20%'}},
        {key: 'state', _style: {width: '20%'}},
        {key: 'postalCode', _style: {width: '20%'}},
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
            case 'ACTIVE':
                return 'success'
            case 'ABSENT':
                return 'secondary'
            case 'SUSPENDED':
                return 'danger'
            case 'RETIRED':
                return 'danger'
            default:
                return 'primary'
        }
    }


    const onSubmitAddForm = (data, e) => {
        setLoading(true)
        data = {
            ...data,
            agency: agencyId
        }
        axios.post('/monitor', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Monitor added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllMonitors()
            })
            .catch((error) => {
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
        delete data._id;
        delete data.certification;
        delete data.__v;
        axios.put('/monitor/' + id, data)
            .then((response) => {
                //console.log(response.data)
                setLoading(false)
                cogoToast.success("Monitor updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllMonitors()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = monitors.findIndex((monitor) => monitor._id === id);
        const monitor = {
            ...monitors[index],
            birthday: monitors[index].birthday.slice(0, 10),
            cinDate: monitors[index].cinDate.slice(0, 10)
        }
        setFormUpdate(monitor)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        const data = {
            agency: agencyId
        }
        axios.delete('/monitor/' + id, {data: data})
            .then(() => {
                cogoToast.success("Monitor deleted successfully", {position: "top-right"})
                getAllMonitors()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    const suspendCustomerHandler = (id) => {
        const data = {
            agency: agencyId
        }
        axios.put('/monitor/suspended/' + id, data)
            .then(() => {
                cogoToast.success("Monitor suspended successfully", {position: "top-right"})
                getAllMonitors()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !monitors ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Monitor" : "Update Monitor"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    formUpdate ?
                                        <UseFormUpdate loading={loading} preloadedValues={formUpdate}
                                                       onSubmit={onSubmitUpdateForm}/> :
                                        <UseForm loading={loading} onSubmit={onSubmitAddForm}/>
                                }
                            </CModalBody>
                        </CModal>
                        <CCard>
                            <CCardHeader>
                                <CButton style={{float: "right"}} color="info"
                                         onClick={() => setVisible(true)}>
                                    <AddBoxIcon/>
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={monitors}
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
                                                            <Popconfirm title="Are you sure？" okText="Yes"
                                                                        onConfirm={() => deleteCustomerHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="danger" className="ml-1">
                                                                    Delete
                                                                </CButton>
                                                            </Popconfirm>
                                                            <Popconfirm title="Are you sure？" okText="Yes"
                                                                        onConfirm={() => suspendCustomerHandler(item._id)}
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

export default withErrorHandler(Monitors,axios);
