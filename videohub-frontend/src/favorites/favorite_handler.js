import { request } from "../helpers/axios_helper";

export function favoriteValid(videoId) {
    return request('get', 'http://localhost:8080/api/favorites/validate/' + videoId)
}

export function favoriteAddRemove(videoId, isFavorite) {
    if (isFavorite) {
        return request('post', 'http://localhost:8080/api/favorites/remove/' + videoId, {}, { responseType: 'text' })
    } else if(!isFavorite) {
        return request('post', 'http://localhost:8080/api/favorites/add/' + videoId, {}, { responseType: 'text' })
    }
}