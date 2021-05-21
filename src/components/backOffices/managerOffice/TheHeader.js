import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
    CLink, CImg, CSidebarBrand
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../../../routes/backOffices/managerOffice/routes'
import * as actions from "../../../store/actions/backOffices/global"

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'
import logo from "../../../assets/frontOffice/img/svg/logo.png";

const TheHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.global.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(actions.sidebarShow(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(actions.sidebarShow(val))
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" >
          <CImg
              src={logo}
              className=""
              alt=""
              width={100}
              height={30}
          />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">

        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to={"/companies/"+props.id+"/dashboard"}>
              <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
              Dashboard
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to={"/companies/"+props.id+"/customers"}>
              <CIcon name="cilPeople" customClasses="c-sidebar-nav-icon"/>
              Customers
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to={"/companies/"+props.id+"/sessions"}>
              <CIcon name="cilAvTimer" customClasses="c-sidebar-nav-icon"/>
              Sessions
          </CHeaderNavLink>
        </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
              <CHeaderNavLink to={"/companies/"+props.id+"/exams"}>
                  <CIcon name="cilFile" customClasses="c-sidebar-nav-icon"/>
                  Exams
              </CHeaderNavLink>
          </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown id={props.id}/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
            <CBreadcrumbRouter
              className="border-0 c-subheader-nav m-0 px-0 px-md-3"
              routes={routes}
            />
          <div className="d-md-down-none mfe-2 c-subheader-nav">

            <CLink
              className="c-subheader-nav-link"
              aria-current="page"
              to={"/companies/"+props.id+"/dashboard"}
            >
              <CIcon name="cil-graph" alt="Dashboard" href="#"/>&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" aria-current="page"
                   to={"/companies/"+props.id+"/settings"} >
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
