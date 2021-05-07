import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
const Dashboard = React.lazy(() => import('../../../views/backOffices/managerOffice/Dashboard/Dashboard'));

// routes config
import routes from '../../../routes/backOffices/managerOffice/routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {

  return (
    <main className="c-main">
      <CContainer fluid>
          <Suspense fallback={loading}>
              <Switch>
                  {routes.map((route, idx) => {
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
                  })}
                  <Redirect from={props.match.path} to={props.match.path+"/dashboard"} />
              </Switch>
          </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
