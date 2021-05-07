import React, { lazy,useState } from 'react'
import {
    CBadge,
    CButton,
    CCardBody,
    CDataTable,
    CCollapse,
    CCard,
    CModal,CModalBody,CModalHeader,CModalFooter
} from '@coreui/react'
import UseForm from "./UseForm";
import UseFormUpdate from "./UseFormUpdate";
const Customers = (props) => {

    const usersData = [
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},
        {id: 0, name: 'John',surname:"Doe",email:"nasreddinebnhamouda@gmail.com",registered: '2018/01/01',cin:"11394843" ,phone:"54808062",address: 'rue tastour al alia', status: 'Pending'},

    ]
    const [formUpdate,setFormUpdate]=useState(null);
    const [details, setDetails] = useState([])
    // const [items, setItems] = useState(usersData)
    const [visible, setVisible] = useState(true);
    const modalCloseHandle=()=>{
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
        { key: 'name', _style: { width: '20%'} },
        { key: 'surname', _style: { width: '20%'} },
        { key: 'email', _style: { width: '20%'} },
        { key: 'cin', _style: { width: '20%'} },
        { key: 'phone', _style: { width: '20%'} },
        { key: 'address', _style: { width: '20%'} },
        'registered',
        { key: 'status', _style: { width: '20%'} },
        {
            key: 'show_details',
            label: 'More',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]

    const getBadge = (status)=>{
        switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Pending': return 'warning'
            case 'Banned': return 'danger'
            default: return 'primary'
        }
    }

    const onSubmitAddForm = (data)=>{
        console.log(data)
    };

    const onSubmitUpdateForm=(data)=>{
        console.log(data)
    };

    const showUpdateForm=(id)=>{

        setFormUpdate({
            id: id,
            cin: "12335874",
            surname:"hamza",
            name:"ben hamouda",
            email:"nasreddinebnhamouda@gmail.com",
            username:"nasreddinebnhamouda",
            address:"rue tastour"
        })
        setVisible(true)
    }








    return (


       <>

               <CModal show={visible} onClose={modalCloseHandle}>
                   <CModalHeader closeButton> {!formUpdate? "Add Customer" :"Update Customer"}</CModalHeader>
                   <br/>
                   <CModalBody>
                       {
                           formUpdate? <UseFormUpdate preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/>:<UseForm onSubmit={onSubmitAddForm}/>
                       }
                   </CModalBody>
               </CModal>
        <CCard>
           <CCardBody>
                <CDataTable
                items={usersData}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                pagination
                scopedSlots = {{
                    'status':
                        (item)=>(
                            <td>
                                <CBadge color={getBadge(item.status)}>
                                    {item.status}
                                </CBadge>
                            </td>
                        ),
                    'show_details':
                        (item, index)=>{
                            return (
                                <td className="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={()=>{toggleDetails(index)}}
                                    >
                                        {details.includes(index) ? 'Hide' : 'Show'}
                                    </CButton>
                                </td>
                            )
                        },
                    'details':
                        (item, index)=>{
                            return (
                                <CCollapse show={details.includes(index)}>
                                    <CCardBody>
                                        <h4>
                                          gggggg
                                        </h4>
                                        <p className="text-muted">User since: {item.registered}</p>
                                        <CButton size="sm" color="info">
                                            User Settings
                                        </CButton>
                                        <CButton size="sm" color="danger" className="ml-1" onClick={()=>showUpdateForm(12545)}>
                                            Delete
                                        </CButton>
                                    </CCardBody>
                                </CCollapse>
                            )
                        }
                    }}
                />
            </CCardBody>
        </CCard>

      </>
    )
}

export default Customers;
