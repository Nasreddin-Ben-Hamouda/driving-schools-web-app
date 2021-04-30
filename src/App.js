import logo from './logo.svg';
//import './App.css';
import { lazy, Suspense } from "react";
import { Switch, Route ,Redirect} from "react-router-dom";
const TheLayout =lazy(() => import('./components/backOffices/userOffice/TheLayout'));


function App() {
  return (
      <Suspense fallback={null}>
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
