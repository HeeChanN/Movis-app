import axios from "axios";

const axiosHost = axios.create({
    baseURL: 'https://api.movis.klr.kr',
    withCredentials: true,
});

export default axiosHost;