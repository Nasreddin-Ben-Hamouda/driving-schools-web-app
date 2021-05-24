import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        if(localStorage.getItem('authToken')){
            req.headers={
                'Authorization': `token ${localStorage.getItem('authToken')}`
            }
        }
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
        res => res,
        err => {
            setError(err.response?err.response:err.message);
            return Promise.reject(err);
        }
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}
