import React from 'react'

export default ()=>{
  //icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  const _nav=
[


    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: `/administrator/dashboard`,
      icon:'cil-speedometer' ,
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },

    {
      _tag: 'CSidebarNavTitle',
      _children: ['Management']
    },

  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: `/administrator/users`,
    icon:'cilPeople' ,
  },
    {
      _tag: 'CSidebarNavItem',
      name: 'Agencies',
      to: `/administrator/agencies`,
      icon:'cilBank' ,
    },

]

  return _nav;

}
