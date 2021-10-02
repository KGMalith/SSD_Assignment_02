import React from 'react'
import { toast } from 'react-toastify';
import {history} from '../../routes/Routes'; 

const errorHandler = (error) => {
    if (error.status === 401) {
        
        toast.error("Unauthorized Action", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTimeout(function () {
            // history.push('/');
            // window.location.reload();
        }, 1000);

        return error.data

    }else {
        toast.error(error.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return error.data
    }

}

const successHandler = (response) => {
    if (response.showMessage === true) {
        toast.success(response.msg , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return response
}

export {
    errorHandler,
    successHandler,
}