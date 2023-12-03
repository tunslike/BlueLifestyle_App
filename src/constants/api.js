import axios from "axios";
import APIBaseUrl from "./config";

const ApiManager = axios.create({
    baseURL: APIBaseUrl.developmentUrl,
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;