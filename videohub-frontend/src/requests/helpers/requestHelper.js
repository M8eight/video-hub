import axios from "axios";



export function requestHelper(method, url, headers = {}) {
    const baseUrl = 'http://localhost:8080';

    return axios.request({method: method, url: baseUrl + url, headers: headers})
}