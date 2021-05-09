

import useHttpErrorHandler from '../../helpers/http-error-handler';
import cogoToast from 'cogo-toast';
import {useEffect} from "react";
const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        useEffect(()=>{
            if(error){
                if(error.data){
                    switch (error.status){
                        case 500:cogoToast.error("Server is down",{position:"top-right"}).then(clearError);
                            break;
                        case 400:cogoToast.error(error.data && error.data.message?error.data.message:"One or more fields is not validated",{position:"top-right"}).then(clearError);
                            break;
                        case 404:cogoToast.error(error.data.message?error.data.message:"Not Found Error",{position:"top-right"}).then(clearError);
                            break;
                        case 409 :cogoToast.error(error.data,{position:"top-right"}).then(clearError)
                            break;
                        //default:cogoToast.error("Something went wrong",{position:"top-right"}).then(clearError);
                    }
                }else{
                    cogoToast.error(error,{position:"top-right"}).then(clearError)
                }

            }
        },[error])



        return (
                <WrappedComponent {...props} />
        );
    };
};

export default withErrorHandler;
