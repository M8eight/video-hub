import { removeAuth } from "../../helpers/axios_helper";


export default function Logout(props) {
    removeAuth();
}