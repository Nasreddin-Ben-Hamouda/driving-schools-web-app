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
const agencyId="606f0dc7e3bf6a72dd524d4f";
const Cars = (props) => {

    const [cars, setCars] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllCars()
    }, []);
    const getAllCars = () => {
        axios.get('/car/' + agencyId)
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

        {key: 'num', label: "Number", _style: {width: '20%'}},
        {key: 'mark', label: "Mark", _style: {width: '20%'}},
        {key: 'model',label: "Model", _style: {width: '20%'}},
        {key: 'serialNum',label: "Serial Number", _style: {width: '20%'}},
        {key: 'dateFirstRegistration',label:"Registration Date", _style: {width: '20%'}},
        {key: 'exploitationCartDate', label:"Exploitation Date",_style: {width: '20%'}},
        {key: 'exploitationCartNum', label:"Exploitation Number",_style: {width: '20%'}},
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
            case 'ACTIVE':
                return 'success'
            case 'SUSPENDED':
                return 'danger'
            case 'RETIRED':
                return 'danger'
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
        axios.post('/car', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Car added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllCars()
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
        axios.put('/car/' + id, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Car updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllCars()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = cars.findIndex((car) => car._id === id);
        const car={
            ...cars[index],
            dateFirstRegistration:cars[index].dateFirstRegistration.slice(0,10),
            exploitationCartDate: cars[index].exploitationCartDate.slice(0,10)
        }
        setFormUpdate(car)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        const data={
            agency:agencyId
        }
        axios.delete('/car/' + id,{data:data})
            .then(() => {
                cogoToast.success("Car deleted successfully", {position: "top-right"})
                getAllCars()
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
        axios.put('/car/suspended/' + id,data)
            .then(() => {
                cogoToast.success("Car suspended successfully", {position: "top-right"})
                getAllCars()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }


    return (


        <>
            {
                !cars ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Car" : "Update Car"}</CModalHeader>
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
                                    items={cars}
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
                                        'dateFirstRegistration':
                                            (item) => (
                                                <td>
                                                    {item.dateFirstRegistration.slice(0, 10)}
                                                </td>
                                            ),
                                        'exploitationCartDate':
                                            (item) => (
                                                <td>
                                                    {item.exploitationCartDate.slice(0, 10)}
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

export default withErrorHandler(Cars,axios);
