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
const Agencies = (props) => {
    const [agencies, setAgencies] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllAgencies()
    }, []);
    const getAllAgencies = () => {
        axios.get('/admin/agencies')
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

        {key: 'title', label: "Title", _style: {width: '20%'}},
        {key: 'cin', _style: {width: '20%'}},
        {key: 'phone', _style: {width: '20%'}},
        {key: 'address', _style: {width: '20%'}},
        {key: 'region', _style: {width: '20%'}},
        {key: 'postalCode',label:"Zip Code", _style: {width: '20%'}},
        {key: 'taxRegistrationNum',label:"Tax Registration Number", _style: {width: '20%'}},
        {key: 'taxRegistrationDate',label:"Tax Registration Date", _style: {width: '20%'}},
        {
            key: 'show_details',
            label: 'Actions',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }
    ]



    const onSubmitAddForm = (data,e) => {
        setLoading(true)
        data = {
            ...data,
        }
        axios.post('/admin/agencies', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Agency added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllAgencies()
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
        }
        const id = data._id;
        delete data.state;
        delete data.licenceExpirationDate;
        delete data._id;
        delete data.__v;
        axios.put('/admin/agencies/' + id, data)
            .then((response) => {
                //console.log(response.data)
                setLoading(false)
                cogoToast.success("Agency updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllAgencies()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
                //all errors handled in withErrorHandler hoc component
            });
    };

    const showUpdateForm = (id) => {
        const index = agencies.findIndex((agency) => agency._id === id);
        const agency={
            ...agencies[index],
            taxRegistrationDate:agencies[index].taxRegistrationDate.slice(0,10),
            cinDate:agencies[index].cinDate.slice(0,10),
        }
        setFormUpdate(agency)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        axios.delete('/admin/agencies/' + id)
            .then(() => {
                cogoToast.success("Agency deleted successfully", {position: "top-right"})
                getAllAgencies()
                setDetails([])
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            });
    }



    return (


        <>
            {
                !agencies ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Agency" : "Update Agency"}</CModalHeader>
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
                                    items={agencies}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'taxRegistrationDate':
                                            (item) => (
                                                <td>
                                                    {item.taxRegistrationDate.slice(0, 10)}
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

export default withErrorHandler(Agencies,axios);
