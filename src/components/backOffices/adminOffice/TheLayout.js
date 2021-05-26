import React from 'react'
import useParams from "react-router-dom"
import { icons } from '../../../assets/backOffices/icons'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import '../../../styles/backOffices/style.scss';
React.icons = icons
const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar  {...props}/>
      <div className="c-wrapper">
        <TheHeader  {...props}/>
        <div className="c-body">
            <TheContent {...props}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
