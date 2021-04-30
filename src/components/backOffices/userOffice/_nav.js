import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilCalendar} from "@coreui/icons";


export default (id)=>{
  //icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  const _nav=
[
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: `/companies/${id}/dashboard`,
      icon:'cil-speedometer' ,
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },
  {
    _tag: 'CSidebarNavItem',
    name: 'Companies',
    to: `/companies/${id}/user-companies`,
    icon:'cilBank' ,

  },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Management']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Customers',
      to: `/companies/${id}/customers`,
      icon:'cilPeople' ,
    },
  {
    _tag: 'CSidebarNavItem',
    name: 'Monitors',
    to: `/companies/${id}/monitors`,
    icon:'cilListRich' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cars',
    to: `/companies/${id}/cars`,
    icon:'cilGarage' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Exams',
    to: `/companies/${id}/exams`,
    icon:'cilFile' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sessions',
    to: `/companies/${id}/sessions`,
    icon:'cilCalendar' ,
  },


]

  return _nav;

}
