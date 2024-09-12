import { getAuthToken } from "./axios_helper";
import { jwtDecode } from "jwt-decode";
import { request } from "./axios_helper";

export function getDecodeJwt() {
    let token = getAuthToken()
    if (token === undefined || token === null) {
        return;
    } else {
        return jwtDecode(token);
    }
}

export function getJwtRoles() {
    let jwtObj = getDecodeJwt()
    console.log(jwtObj)

    return jwtObj["role"].map((el) => {
        return el["name"]
    })
}

export function getLogin() {
    return getDecodeJwt()?.sub
}

export function isAuth() {
    return getAuthToken() !== null ? true : false 
}

export function getUserById(id) {
    return request("get", "/api/user/" + id).then(
        res => {
            return res.data
        }
    )
}