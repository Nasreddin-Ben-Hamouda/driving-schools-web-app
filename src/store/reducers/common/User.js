import * as actionTypes from '../../actions/common/actionTypes';

import { updateObject } from '../../../helpers/utility'


const initialState = {
    authToken: null,
    user: null,
    loading: false,
    ready:false,
    redirect:null
};

const authStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        authToken: action.authToken,
        user: action.user,
        loading: false,
        redirect: action.redirect
    } );
};

const authFinish = (state, action) => {
    return updateObject( state, {
        redirect: null
    } );
}

const authFail = (state, action) => {
    return updateObject( state, {
        loading: false,
        redirect:null
    });
};

const authLogout = (state, action) => {
    return updateObject(state,
        {
            authToken: null, user: null,loading: false,ready:true,redirect:null
        });
};
const updateUser = (state, action) => {
    return updateObject(state, {  user:action.user });
};


const takeReadyTrue=(state,action)=>{
    return updateObject( state, {
        ready: true
    });
}
const takeReadyFalse=(state,action)=>{
    return updateObject( state, {
        ready: false
    });
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return authStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.TAKE_READY_TRUE: return takeReadyTrue(state, action);
        case actionTypes.TAKE_READY_FALSE: return takeReadyFalse(state, action);
        case actionTypes.UPDATE_USER: return updateUser(state, action);
        case actionTypes.AUTH_FINISH: return authFinish(state, action);
        default:return state;
    }
};

export default reducer;
