import {NavigateFunction} from "react-router-dom";
import {paths} from "../app-paths";

export const errorFallback = (e, navigate: NavigateFunction) => {
    if(e.status === APIError.UNAUTHORIZED || e.status === APIError.FORBIDDEN) return
    navigate(paths["internal-error"])
}

export enum APIError{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 405,
    INTERNAL_ERROR = 500
}