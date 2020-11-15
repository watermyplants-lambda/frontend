import axios from 'axios';

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");
    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: 'https://watermyplants35.herokuapp.com/'
    });
};

export default axiosWithAuth;