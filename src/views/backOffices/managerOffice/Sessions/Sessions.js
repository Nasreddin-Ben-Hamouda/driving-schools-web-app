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
import cogoToast from "cogo-toast";
import { Popconfirm } from 'antd';
import "antd/dist/antd.css";
import subAxios from "../../../../axios/subscription-service";
import schAxios from "../../../../axios/scheduling-service";
const agencyId="606f0dc7e3bf6a72dd524d4f";
const Sessions = (props) => {

    const [sessions, setSessions] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState(null);
    const [monitors, setMonitors] = useState(null);
    const [cars, setCars] = useState(null);

    useEffect(() => {
        getAllSessions()
        getClients()
        getMonitors()
        getCars()
    }, []);
    const getAllSessions = () => {
        schAxios.get('/session/' + agencyId)
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const getClients = () => {
        subAxios.get('/client/' + agencyId)
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const getMonitors = () => {
        schAxios.get('/monitor/' + agencyId)
            .then((response) => {
                setMonitors(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const getCars = () => {
        schAxios.get('/car/' + agencyId)
            .then((response) => {
                setCars(response.data);
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
        {key: 'client', label: "Customer", _style: {width: '30%'}},
        {key: 'monitor', _style: {width: '30%'}},
        {key: 'car', _style: {width: '30%'}},
        {key: 'startDate', label: "Start Date"},
        {key: 'endDate', label: "End Date"},
        {key: 'isPayed',label:'Payment' ,_style: {width: '20%'}},
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
            case 'FINISHED':
                return 'success'
            case 'APPROVED':
                return 'primary'
            case 'CANCELED':
                return 'danger'
            case 'REQUESTED':
                return 'warning'
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
        console.log(data)
        schAxios.post('/session/reserve', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Session reserved successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllSessions()
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
        delete data.state;
        delete data._id;
        delete data.__v;
        delete data.isPayed;
        schAxios.patch('/session/update/' + id, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Exam updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllSessions()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = sessions.findIndex((exam) => exam._id === id);
        console.log(sessions[index])
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        const exam = {
            ...sessions[index],
            startDate:new Date(sessions[index].startDate).addHours(1).toISOString().slice(0, -1),
            endDate:new Date(sessions[index].endDate).addHours(1).toISOString().slice(0, -1),
            client: sessions[index].client._id,
            car: sessions[index].car._id,
            monitor: sessions[index].monitor._id
        }
        setFormUpdate(exam)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        const data = {
            agency: agencyId
        }
        schAxios.delete('/session/reject/' + id, {data: data})
            .then(() => {
                cogoToast.success("Exam deleted successfully", {position: "top-right"})
                getAllSessions()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    const cancelSessionHandler = (id) => {
        const data = {
            agency: agencyId
        }
        schAxios.patch('/session/cancel/' + id, data)
            .then(() => {
                cogoToast.success("Session canceled successfully", {position: "top-right"})
                getAllSessions()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }
    const finishSessionHandler = (id) => {
        const data = {
            agency: agencyId
        }
        schAxios.patch('/session/finish/' + id, data)
            .then(() => {
                cogoToast.success("Session finished successfully", {position: "top-right"})
                getAllSessions()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }
    const paidSessionHandler = (id) => {
        const data = {
            agency: agencyId
        }
        schAxios.patch('/session/paid/' + id, data)
            .then(() => {
                cogoToast.success("Session paid successfully", {position: "top-right"})
                getAllSessions()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !sessions ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Session" : "Update Session"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {clients && monitors && cars ?
                                    formUpdate ?
                                        <UseFormUpdate loading={loading} preloadedValues={formUpdate}
                                                       onSubmit={onSubmitUpdateForm} clients={clients}
                                                       monitors={monitors} cars={cars}/> :
                                        <UseForm loading={loading} onSubmit={onSubmitAddForm} clients={clients}
                                                 monitors={monitors} cars={cars}/>
                                    :
                                    <CSpinner color="info" style={{marginLeft: "45%"}}/>
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
                                    items={sessions}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'client':
                                            (item) => (
                                                <td>
                                                    <small><b>First Name : </b></small>
                                                    <small>{item.client.name}</small><br/>
                                                    <small><b>Last Name:</b> </small>
                                                    <small>{item.client.surname}</small>
                                                </td>
                                            ),
                                        'monitor':
                                            (item) => (
                                                <td>
                                                    <small><b>First Name :</b> </small>
                                                    <small>{item.monitor.surname}</small><br/>
                                                    <small><b>Last Name:</b></small> <small>{item.monitor.name}</small>
                                                </td>
                                            ),
                                        'car':
                                            (item) => (
                                                <td>
                                                    <small><b>Number : </b></small> <small>{item.car.num}</small><br/>
                                                    <small><b>Mark: </b></small> <small>{item.car.mark}</small><br/>
                                                    <small><b>Model:</b> </small> <small>{item.car.model}</small>
                                                </td>
                                            ),
                                        'state':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getBadge(item.state)}>
                                                        {item.state}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'startDate':
                                            (item) => (
                                                <td>
                                                    {new Date(item.startDate).toLocaleString()}
                                                </td>
                                            ),
                                        'endDate':
                                            (item) => (
                                                <td>
                                                    {new Date(item.endDate).toLocaleString()}
                                                </td>
                                            ),
                                        'isPayed':
                                            (item) => (
                                                <td>
                                                    {item.isPayed ? "paid" : "not paid yet"}
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
                                                                        onConfirm={() => paidSessionHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="primary" className="ml-1">
                                                                    Paid
                                                                </CButton>
                                                            </Popconfirm>
                                                            <Popconfirm title="Are you sure？" okText="Yes"
                                                                        onConfirm={() => cancelSessionHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="warning" className="ml-1">
                                                                    Cancel
                                                                </CButton>
                                                            </Popconfirm>
                                                            <Popconfirm title="Are you sure？" okText="Yes"
                                                                        onConfirm={() => finishSessionHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="success" className="ml-1">
                                                                    Finish
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

export default withErrorHandler(Sessions,schAxios);
