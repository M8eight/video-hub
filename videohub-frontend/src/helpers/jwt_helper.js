import { getAuthToken } from "./axios_helper";
import { jwtDecode } from "jwt-decode";
import { request } from "./axios_helper";

/**
 * Gets the decoded JWT token from the current auth token
 * @returns {object | undefined} The decoded JWT token, or undefined if no token is present
 */
export function getDecodeJwt() {
    let token = getAuthToken()
    if (token === undefined || token === null) {
        return;
    } else {
        return jwtDecode(token);
    }
}

// export function getJwtRoles() {
//     let jwtObj = getDecodeJwt()
//     console.log(jwtObj)

//     if (jwtObj !== undefined || jwtObj !== null) {
//         return jwtObj["role"].map((el) => {
//             return el["name"]
//         })
//     }
// }

export function getLogin() {
    return getDecodeJwt()?.sub
}

/**
 * Checks if the user is authenticated
 * @returns {boolean} True if the user is authenticated, false otherwise
 */
export function isAuth() {
    return getAuthToken() !== null ? true : false 
}

/**
 * Gets the user ID from the current JWT token
 * @returns {number | undefined} The user ID, or undefined if no token is present
 */
export function getUserId() {
    let jwt = getDecodeJwt()
    if (jwt === undefined || jwt === null) {
        return undefined;
    }
    return jwt.id
}

/**
 * Checks if the user is an admin
 * @returns {boolean} True if the user is an admin, false otherwise
 */
export function isAdmin() {
    let jwt = getDecodeJwt()
    if (jwt === undefined || jwt === null) {
        return false;
    }
    return jwt.role.map((el) => el.name).includes("ROLE_ADMIN")
}



