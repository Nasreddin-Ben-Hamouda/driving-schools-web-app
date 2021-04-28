import axios from "../../../axios-instance"
import * as actionTypes from "./actionTypes"


export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userData:user
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(refreshToken());
        }, expirationTime * 1000);
    };
};

export const refreshToken=()=>{
   //sent http request for refreshing the token
    //add some logic here
}
export const loginWithGoogle=()=>{
    //sent http request for refreshing the token
    //add some logic here
}
export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            email: email,
            password: password
        };
        axios.post('/login', authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(loginFail(err.response.data.error));
            });
    };
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(refreshToken());
            } else {
                const userId = localStorage.getItem('userId');
                const username=localStorage.getItem('username');
                const user={
                    userId:userId,
                    username:username,
                    expirationDate:expirationDate
                }
                dispatch(loginSuccess(user));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};
