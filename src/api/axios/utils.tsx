import axios from 'axios';
import * as React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {appToast, ToastType} from "../../components/toast";
import {logout} from "./authentication/api";
import {AUTH_COOKIE_NAME} from "../../logic/context/auth-context";
import Cookies from 'js-cookie'
import {API_URL} from "../../constants";


axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

declare global{
    interface Promise<T> {
        logErrorAndRethrow(): Promise<T>
    }
}

Promise.prototype.logErrorAndRethrow = function() {
    return this.catch(async (e) => {
        if(e.response){
            console.log("Response received with error")
            console.log({status: e.response.status, message: e.response.data.title})
            const message = e.response.data.title
            switch (e.response.status){
                case 401:
                    Cookies.remove(AUTH_COOKIE_NAME)
                    appToast(ToastType.WARNING, "Logged in another device")
                    break
                case 403:
                    appToast(ToastType.WARNING, "You are not authorized to perform this action")
                    break
            }
            throw e.response.data
        }else if (e.request) {
            console.log("No response received from the server")
            console.log(e.request);
            throw e
        } else {
            console.log("Something happened while setting up the request that triggered an Error")
            console.log({title: e.message, status: e.response.status})
            throw e
        }
    })
}

export {}