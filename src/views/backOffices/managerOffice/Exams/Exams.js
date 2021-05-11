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
const Exams = (props) => {

    const [exams, setExams] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState(null);
    const [monitors, setMonitors] = useState(null);
    const [cars, setCars] = useState(null);

    useEffect(() => {
        getAllExams()
        getClients()
        getMonitors()
        getCars()
    }, []);
    const getAllExams = () => {
        schAxios.get('/exam/' + agencyId)
            .then((response) => {
                setExams(response.data);
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

        {key: 'numexam', label: "Number", _style: {}},
        {key: 'client', label: "Customer", _style: {width: '30%'}},
        {key: 'monitor', _style: {width: '30%'}},
        {key: 'car', _style: {width: '30%'}},
        {key: 'examDate', label: "Date", _style: {width: '20%'}},
        {key: 'examinateur', label: "Examiner", _style: {width: '20%'}},
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
            case 'succeed':
                return 'success'
            case 'scheduled':
                return 'primary'
            case 'failed':
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
         schAxios.post('/exam/scheduled', data)
             .then(() => {
                 setLoading(false)
                 cogoToast.success("Exam added successfully", {position: "top-right"})
                 modalCloseHandle()
                 e.target.reset()
                 getAllExams()
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
        schAxios.put('/exam/' + id, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Exam updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllExams()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = exams.findIndex((exam) => exam._id === id);
        console.log(exams[index])
        const exam = {
            ...exams[index],
            examDate: exams[index].examDate.slice(0, 10),
            client:exams[index].client._id,
            car:exams[index].car._id,
            monitor:exams[index].monitor._id
        }
        setFormUpdate(exam)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        const data = {
            agency: agencyId
        }
        schAxios.delete('/exam/' + id, {data: data})
            .then(() => {
                cogoToast.success("Exam deleted successfully", {position: "top-right"})
                getAllExams()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }

    const succeedExamHandler = (id) => {
        const data = {
            agency: agencyId
        }
        schAxios.patch('/exam/succeed/' + id, data)
            .then(() => {
                cogoToast.success("Exam succeeded successfully", {position: "top-right"})
                getAllExams()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }
    const failedExamHandler = (id) => {
        const data = {
            agency: agencyId
        }
        schAxios.patch('/exam/failed/' + id, data)
            .then(() => {
                cogoToast.success("Exam failed successfully", {position: "top-right"})
                getAllExams()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !exams ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Monitor" : "Update Monitor"}</CModalHeader>
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
                                    items={exams}
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
                                        'examDate':
                                            (item) => (
                                                <td>
                                                    {item.examDate.slice(0, 10)}
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
                                                                        onConfirm={() => succeedExamHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="success" className="ml-1">
                                                                    Succeed
                                                                </CButton>
                                                            </Popconfirm>
                                                            <Popconfirm title="Are you sure？" okText="Yes"
                                                                        onConfirm={() => failedExamHandler(item._id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="warning" className="ml-1">
                                                                    Failed
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

export default withErrorHandler(Exams,schAxios);
