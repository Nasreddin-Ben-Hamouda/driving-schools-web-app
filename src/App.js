import logo from './logo.svg';
import './App.css';
import { lazy, Suspense } from "react";
import { Switch, Route ,Redirect} from "react-router-dom";


function App() {
  return (
      <Suspense fallback={null}>
          <Switch>
              <Route
                  path='/'
                  exact
                  component={lazy(() => import(`./containers/frontOffice/Home`))}
              />
              <Redirect to={"/"}/>
          </Switch>
      </Suspense>
  );
}

export default App;
