import axios from "../../../axios/auth-service"
import axiosLogin from "../../../axios/login-register-auth-service"
import * as actionTypes from "./actionTypes"
import cogoToast from "cogo-toast";

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (user,authToken,redirect) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user:user,
        authToken:authToken,
        redirect:redirect
    };
};

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL,
    };
};
export const authFinish = () => {
    return {
        type: actionTypes.AUTH_FINISH,
    };
};
export const takeReadyTrue=()=>{
    return {
        type: actionTypes.TAKE_READY_TRUE,
    };
}
export const takeReadyFalse=()=>{
    return {
        type: actionTypes.TAKE_READY_FALSE,
    };
}

export const updateUser=(user)=>{
    return {
        type: actionTypes.UPDATE_USER,
        user:user
    };
}

export const logout = () => {
    localStorage.removeItem('authToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    };

};

export const loginWithGoogle=()=>{
    //add some logic here
}
export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        const data = {
            email: email,
            password: password
        };
        axiosLogin.post('/auth/login', data)
            .then(response => {
                localStorage.setItem('authToken', response.data.authToken);
                dispatch(
                    loginSuccess(
                        response.data.user,
                        response.data.authToken,
                        response.data.user.role==="ADMIN"?"/administrator":"/companies"));
            })
            .catch(err => {
                dispatch(loginFail());
            });
    };
};

export const getAuthenticatedUser = () => {
    return (dispatch) => {
            dispatch(takeReadyFalse())
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                dispatch(logout());
            } else {
                axios.get('/auth/whoami')
                    .then((response) => {
                        dispatch(loginSuccess(response.data,authToken,null));
                        dispatch(takeReadyTrue())
                    })
                    .catch(()=>{
                        dispatch(takeReadyTrue())
                    })


            }

    };
};
