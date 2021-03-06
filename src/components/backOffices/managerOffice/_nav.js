import React from 'react'

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
    name: 'Settings',
    to: `/companies/${id}/settings`,
    icon:'cilSettings' ,

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
    _tag: 'CSidebarNavDropdown',
    name: 'Sessions Management',
    icon: 'cilNotes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Sessions',
        to: `/companies/${id}/sessions`,
        icon:'cilAvTimer' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: `/companies/${id}/sessions/calendar`,
        icon:'cilCalendar' ,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Exams Management',
    icon: 'cilTask',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Exams',
        to: `/companies/${id}/exams`,
        icon:'cilFile' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: `/companies/${id}/exams/calendar`,
        icon:'cilCalendar' ,
      },
    ],
  },


]

  return _nav;

}
