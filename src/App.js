import logo from './logo.svg';
//import './App.css';
import React, { lazy, Suspense,useEffect,useState } from "react";
import { Switch, Route ,Redirect} from "react-router-dom";
import {
    CSpinner
} from '@coreui/react'
import cogoToast from 'cogo-toast';
import { Spin, Space } from 'antd';
import "antd/dist/antd.css";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/actions/common/User";
import axios from "./axios/auth-service"
import withErrorHandler from "./hoc/backOffices/withErrorHandler";
const TheLayout =lazy(() => import('./components/backOffices/managerOffice/TheLayout'));


function App() {
    let appReady = useSelector(state => state.user.ready);
    let user = useSelector(state => state.user.user)
    let authToken = useSelector(state => state.user.authToken)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getAuthenticatedUser())
    }, [])
    return (
        <>
            <Suspense fallback={<Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>}>
                {appReady ?
                    <Switch>
                        {
                            user && authToken ?
                                <Route path="/companies" render={props => <TheLayout {...props}/>}/>
                                :
                                <Redirect from={"/companies"} to={"/"}/>

                        }
                        <Route
                            path='/'
                            exact
                            component={lazy(() => import(`./views/frontOffice/Home/Home`))}
                        />
                        <Route
                            path='/user/confirmation/:tokenId'
                            component={lazy(() => import(`./views/frontOffice/Auth/Confirmation/Confirmation`))}
                        />
                        <Route component={lazy(() => import(`./views/common/NotFound/NotFound`))}/>

                    </Switch>
                    :
                    <Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>
                }
            </Suspense>
        </>

    );
}

export default withErrorHandler(App,axios);
