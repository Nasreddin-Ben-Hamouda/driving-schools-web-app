import React, { Suspense,useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
const Dashboard = React.lazy(() => import('../../../views/backOffices/managerOffice/Dashboard/Dashboard'));

// routes config
import routes from '../../../routes/backOffices/managerOffice/routes'
import externRoutes from '../../../routes/backOffices/managerOffice/externRoutes'

import {useSelector} from "react-redux";
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
    const user = useSelector(state => state.user.user);

  return (
    <main className="c-main">
      <CContainer fluid>
          <Suspense fallback={loading}>

              <Switch>
                  {
                      user.agency?
                      routes.map((route, idx) => {
                      return route.component && (
                          <Route
                              key={idx}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              render={props => (
                                  <CFade>
                                      <route.component {...props} />
                                  </CFade>
                              )} />
                      )
                     })
                     :
                      externRoutes.map((route, idx) => {
                              return route.component && (
                                  <Route
                                      key={idx}
                                      path={route.path}
                                      exact={route.exact}
                                      name={route.name}
                                      render={props => (
                                          <CFade>
                                              <route.component {...props} />
                                          </CFade>
                                      )} />
                   )})
                  }
                  {
                      user.agency?
                          <Redirect from={props.match.path} to={props.match.path+"/"+user.agency+"/dashboard"} />
                          :
                          <Redirect from={props.match.path} to={"/companies/0/createAgency"} />
                  }

              </Switch>
          </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
