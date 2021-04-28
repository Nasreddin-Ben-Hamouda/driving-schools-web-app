import * as actionTypes from '../../actions/common/actionTypes';

import { updateObject } from '../../../helpers/utility'


const initialState = {
    token: null,
    userId: null,
    name:null,
    error: null,
    loading: false,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        token: action.userData.token,
        userId: action.userData.userId,
        username:action.userData.username,
        error: null,
        loading: false
    } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null,username:null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return authStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;
