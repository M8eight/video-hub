import axios from "axios";
import { getUserId } from "./jwt_helper";

axios.defaults.baseURL = "http://localhost:8080";

export const getReqFavorites = () => {
    const userId = getUserId();
    if (userId === undefined) {
        return null;
    }
    axios({
        method: "get",
        url: "/api/favorites/get",
        headers: { "Content-Type": "application/json" },
        responseType: 'json'
    })
}

export async function getFavorites() {
    let favorites = window.localStorage.getItem("favorite");
    if (favorites === null) {
        favorites = await getReqFavorites().then((req) => {
            favorites = req.data;
        });
        window.localStorage.setItem("favorite", favorites);
    }
    if (typeof favorites === "string") {
        favorites = await JSON.parse(favorites);
    }
    return favorites;
}

export const removeAuth = () => {
    window.localStorage.removeItem("auth_token");
}