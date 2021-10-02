import axios from 'axios';
import { successHandler } from '../interceptor';
import { errorHandler } from '../interceptor';
import { getAccessToken } from '../util/auth';
const BASE_URL = process.env.REACT_APP_REST_API_BASE_URL;

// Init Axios
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// Add interceptors
axiosInstance.interceptors.request.use(

    async request => {
        const token = await getAccessToken();
        request.headers = {
            'Authorization': `${token}`
        }
        return request;
    }
);


//Axios response interceptor
axiosInstance.interceptors.response.use(
    response => successHandler(response.data),
    error => errorHandler(error.response),
)
