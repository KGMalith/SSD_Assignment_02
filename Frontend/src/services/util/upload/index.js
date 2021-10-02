import { axiosInstance } from '../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//connect google account API Call
export let initiateGoogleRequest = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/upload/auth/google')
        return value;
    } catch (error) {
        return error;
    }
}

//connect google account API Call
export let connectGoogleAccountRequest = async (code) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload/auth/connect-account',{
            auth_code:code
        });
        return value;
    } catch (error) {
        return error;
    }
}

//disconnect google account API Call
export let disconnectGoogleAccountRequest = async (code) => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/upload/auth/disconnect-account');
        return value;
    } catch (error) {
        return error;
    }
}

//upload image to google drive API Call
export let uploadImageToDriveRequest = async (imageFile,setPrecentage) => {
    try {
        const data = new FormData()
        data.append('file', imageFile)
        let value = await axiosInstance.post(BASE_URL + '/upload/image',data,{
            onUploadProgress: progressEvent => {
                let value = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total);
                setPrecentage(value);
                setTimeout(() => setPrecentage(0), 1500);
            },
        });
        return value;
    } catch (error) {
        return error;
    }
}