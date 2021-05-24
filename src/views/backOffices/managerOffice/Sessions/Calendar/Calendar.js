import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '../../../../../styles/backOffices/calendar.scss';
import withErrorHandler from "../../../../../hoc/backOffices/withErrorHandler";
import {
    CCard,
    CCardBody,
    CModal,
    CModalBody,
    CModalHeader,
} from "@coreui/react";
import Accordions from "./Accordions";
import axios from "../../../../../axios/scheduling-service";
import {useSelector} from "react-redux";


const Calendar=()=>{
        const agencyId=useSelector(state=>state.user.user.agency);
        const [visible, setVisible] = useState(false);
        const [events,setEvents]=useState([]);
        const [date,setDate]=useState(null)
        useEffect(()=>{
            getAllSessions();
        },[])
        const modalCloseHandle = () => {
            setVisible(false);
            setDate(null);
            getAllSessions();
        }
        const handleDateClick=(arg)=>{

            if(events.filter(event=>event.date===arg.dateStr).length>0){
                setVisible(true)
                setDate(arg.dateStr)
            }

        }
        const getAllSessions = () => {
            axios.get('/session/requested/' + agencyId)
                .then((response) => {
                    let events=[];
                    response.data.map(session=>{
                        if(events.filter(event=>event.date===session.startDate.slice(0, 10)).length>0){
                          const eventIndex=events.findIndex(event=>event.date===session.startDate.slice(0, 10));
                          const event={
                              ...events[eventIndex],
                              nbr:events[eventIndex].nbr+1,
                              title:events[eventIndex].nbr+1+" sessions"
                          }
                          events[eventIndex]={
                              ...event
                          }

                        }else {
                            const event={
                                nbr:1,
                                title:"1 session",
                                date:session.startDate.slice(0, 10)
                            }
                            events.push(event)
                        }
                    })
                    setEvents(events);
                })
                .catch((error) => {
                    //all errors handled in withErrorHandler hoc component
                })
        }

        return (
            <>
                <CModal show={visible} onClose={modalCloseHandle}>
                    <CModalHeader closeButton style={{color:"#3c4b64",fontWeight:"bold"}}>Sessions</CModalHeader>
                    <br/>
                    <CModalBody>
                        {
                            date?
                                <Accordions date={date}/>
                                :
                                null
                        }

                    </CModalBody>
                </CModal>
                <CCard>
                    <CCardBody>
                        <FullCalendar
                            dateClick={handleDateClick}
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            events={events}
                        />
                    </CCardBody>
                </CCard>
            </>
        )

}

export default withErrorHandler(Calendar,axios)
