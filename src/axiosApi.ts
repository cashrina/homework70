import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://homework70-6a1d8-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;