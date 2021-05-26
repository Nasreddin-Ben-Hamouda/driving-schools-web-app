import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem, CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as actions from "../../../store/actions/backOffices/global"
// sidebar nav config
import navigation from './_nav'
import logo from "../../../assets/logo.png"
const TheSidebar = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.global.sidebarShow)
  const user = useSelector(state => state.user.user)
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(actions.sidebarShow(val))}
    >
      <CSidebarBrand className="d-md-down-none"  to={"/administrator"}>
        <CImg className="c-sidebar-brand-full"
            src={logo}
            alt=""
            width={150}
            height={50}
        />
        <CImg className="c-sidebar-brand-minimized"
              src={logo}
              alt=""
              width={50}
              height={55}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation()}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
