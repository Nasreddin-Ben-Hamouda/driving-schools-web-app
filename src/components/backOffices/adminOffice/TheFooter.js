import React  from 'react'
import { CFooter } from '@coreui/react'
import {Link} from "react-router-dom"
const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <Link to={"/"}>Driving School</Link>
        <span className="ml-1">&copy; {new Date().getFullYear()} creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
          <Link to={"/"}>Cosa Nostra Team</Link>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
