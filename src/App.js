import logo from './logo.svg';
//import './App.css';
import React, { lazy, Suspense } from "react";
import { Switch, Route ,Redirect} from "react-router-dom";
import {
    CSpinner
} from '@coreui/react'
const TheLayout =lazy(() => import('./components/backOffices/managerOffice/TheLayout'));


function App() {
  return (
      <Suspense fallback={<CSpinner color="info" />}>
          <Switch>
              <Route path="/companies/:id"  render={props => <TheLayout {...props}/>} />
              <Route
                  path='/'
                  exact
                  component={lazy(() => import(`./views/frontOffice/Home/Home`))}
              />
              <Route component={lazy(()=>import(`./views/common/NotFound/NotFound`))}/>
          </Switch>
      </Suspense>
  );
}

export default App;
