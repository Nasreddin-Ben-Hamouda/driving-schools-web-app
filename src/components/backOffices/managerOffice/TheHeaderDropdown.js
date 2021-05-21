import React from 'react'
import {
  Link
} from "react-router-dom";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import userImg from '../../../assets/backOffices/img/user.png'

const TheHeaderDropdown = (props) => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={userImg}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem to={`/companies/${props.id}/Profile`}>
          <CIcon name="cil-user" className="mfe-2" />
           Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem to={`/companies/${props.id}/Profile`}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
              Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
