import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const removeAuth = () => {
    window.localStorage.removeItem("auth_token");
}

/**
 * Sets the authentication token in the local storage, or removes it if the given value is null.
 * @param {string | null} token The authentication token to set or null to remove it.
 */
export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
}

/**
 * Makes a request to the server using the given method and URL.
 *
 * If an auth token is available in local storage, it is added to the
 * Authorization header of the request.
 *
 * @param {string} method - The method to use for the request.
 * @param {string} url - The URL to make the request to.
 * @param {object} [data={}] - The data to send with the request.
 * @param {object} [headers={}] - The headers to send with the request.
 * @returns {Promise<Object>} Then and catch callbacks of the request.
 */
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

/**
 * Makes a request to the server using the given method and URL.
 * 
 * This function is similar to the request function, but it sets the responseType to 'text'.
 * This is useful for making requests that return text, such as when making a request to
 * the authentication endpoint.
 * 
 * @param {string} method - The method to use for the request.
 * @param {string} url - The URL to make the request to.
 * @param {object} [data={}] - The data to send with the request.
 * @param {object} [headers={}] - The headers to send with the request.
 * @returns {Promise<Object>} Then and catch callbacks of the request.
 */
export const authRequest = (method, url, data = [], headers = {}) => {
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
        responseType: 'text'
    });
}