import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const removeAuth = () => {
    window.localStorage.removeItem("auth_token");
}

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
}

export const request = (method, url, data = [], headers = {}) => {

    if (getAuthToken() !== null && getAuthToken() !== "null" && getAuthToken() !== undefined && getAuthToken() !== "undefined") {
        headers['Authorization'] = `Bearer ${getAuthToken()}`;
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
}

export const authRequest = (method, url, data = [], headers = {}) => {
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
        responseType: 'text'
    });
}