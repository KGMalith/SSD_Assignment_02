import { axiosInstance } from '../../init';
const TOKEN_KEY = 'isLoggedIn';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//getUserDetails API Call
export let getUserDetails = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/get-user-details');
        return value;
    } catch (error) {
        return error;
    }
}

//set Access Token
export let setAccessToken = (value) => {
    return localStorage.setItem('token', value);
}

//get Access Token 
export let getAccessToken = () => {
    return localStorage.getItem('token');
}


//delete Access Token
export let logout = () => {
    return localStorage.clear();
}

//Check user is logged in function
export let isLogin = () => {
    return localStorage.getItem(TOKEN_KEY) ? true : false;
}

