import * as React from "react";
import { useCurrentUser} from "./user-context";
import {LoginInputDTO} from "../../api/dto/input/login-input";
import {login, logout} from "../../api/axios/authentication/api";
import useCookie from "../hooks/use-cookie";

export const AuthContext = React.createContext(null)

interface AuthReturnProps {
    login: (inputDTO: LoginInputDTO) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    uid: number | undefined;
}

export const AUTH_COOKIE_NAME = "uid";
const COOKIE_EXPIRE_OFFSET = 10000 //30 secs

//TODO: alternativa para utilizar cookie para saber se temos login, fazer um endpoint que nao requer autenticacao, que devolve o user, e se nao tiver user, nao esta logado, se tiver esta logado, devolve o user


export const AuthProvider = ({children } : { children : React.ReactNode}) => {
    const [cookie, updateCookie, removeCookie] = useCookie(
        AUTH_COOKIE_NAME,
        undefined,
        () => {
            fetchCurrentUser(-1)
        })
    const {currentUser, fetchCurrentUser } = useCurrentUser()


    const loginCB = React.useCallback(async (inputDTO: LoginInputDTO) => {
        const loginInfo = (await login(inputDTO) )
        updateCookie(loginInfo.id, {
            path: '/' ,
            expires: new Date(Date.now()  + loginInfo.expiresIn - COOKIE_EXPIRE_OFFSET) //-10 secs to make sure it expires before the real auth expires
        })
        await fetchCurrentUser(loginInfo.id)
    }, [])

    const logoutCB = React.useCallback(async () => {

        removeCookie();
        await fetchCurrentUser(-1)
        await logout();
    }, [])

    const isLoggedIn = React.useMemo(() => {
        return (( currentUser !== undefined && currentUser !== null) && (cookie !== undefined && cookie !== null )  )
    }, [currentUser, cookie])

    const uid = React.useMemo(() => {
        if(cookie === undefined || cookie === null) return undefined
        return parseInt(cookie) ;
    }, [cookie])


    return (
        <AuthContext.Provider value={{
            login : loginCB,
            logout : logoutCB,
            isLoggedIn : isLoggedIn,
            uid : uid
        }}>
            {children}
        </AuthContext.Provider>
    )
}


//TODO: think if the useauth should be provider or the usecookie should be the provider
export const useAuth : () => AuthReturnProps = () => React.useContext(AuthContext)