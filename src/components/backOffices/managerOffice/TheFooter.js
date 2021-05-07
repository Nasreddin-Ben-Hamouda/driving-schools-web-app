import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Driving School</a>
        <span className="ml-1">&copy; {new Date().getFullYear()} creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">Cosa Nostra Team</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
