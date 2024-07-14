import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import axios from 'axios';

const getToken = () => sessionStorage.getItem('AUTHORIZATION');

const axiosInstance = axios.create({
    baseURL: SharedVarConstants.HOST_NAME_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;