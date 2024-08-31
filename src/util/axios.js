import axios from 'axios'
import ls from 'localstorage-slim';
import Toast from "./toast"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) { prom.reject(error); }
        else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};
axiosInstance.interceptors.request.use((config) => {
    let access_token = ls.get("access_token", { decrypt: true });
    config.headers['Authorization'] = access_token;
    config.headers['Accept'] = 'application/json'
    return config;
}, (error) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const statusCode = error.response?.status
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const response = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers['Authorization'] = response.access_token;
                    return axios(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {}, {
                    headers: { "Accept": 'application/json', "Authorization": ls.get("refresh_token", { decrypt: true }) }
                });
                ls.set("access_token", response.data.data.access_token, { encrypt: true })
                ls.set("refresh_token", response.data.data.refresh_token, { encrypt: true })
                processQueue(null, response.data.data.access_token);
                originalRequest.Authorization = response.data.data.access_token
                return axiosInstance(originalRequest);
            } catch (err) {
                if (err?.response?.status) {
                    Toast.error("Session Exipred")
                    ls.remove('auth_user')
                    ls.remove('access_token')
                    ls.remove('refresh_token')
                    window.location = '/sign-in';
                }
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        else if (401 === statusCode) {
            Toast.error("Session Exipred")
            ls.remove('auth_user')
            ls.remove('access_token')
            ls.remove('refresh_token')
            window.location = '/sign-in';
        }
        else if ([400, 500, 404, 409].includes(statusCode)) {
            Toast.error(error.response.data.message)
        } else {
            Toast.error("Network Error")
        }

        return Promise.reject(error);
    }
);

export default axiosInstance