import * as React from "react";
import {LoginInputDTO} from "../../api/dto/input/login-input";
import {login, logout} from "../../api/axios/authentication/api";
import useCookie from "../hooks/use-cookie";
import {User} from "../../model/user";
import {getMyUser} from "../../api/axios/user/api";
import {dtoToUser} from "../../api/dto/output/user-output";

export const AuthContext = React.createContext(null)

interface AuthReturnProps {
    login: (inputDTO: LoginInputDTO) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    user : User,
    fetchCurrentUser : () => Promise<void>;
}

export const AUTH_COOKIE_NAME = "user-info";
const COOKIE_EXPIRE_OFFSET = 10000 //30 secs


export const AuthProvider = ({children } : { children : React.ReactNode}) => {
    const [cookie, updateCookie, createCookie, removeCookie] = useCookie(
        AUTH_COOKIE_NAME,
        undefined,
        () => {}
    )

    /**
     * Fetches the current user from the api and stores it in the local storage
     * @param argUID the id of the user to fetch, if not provided, the id is taken from the cookie, if this id is -1, the current user is set to null
     */
    const fetchCurrentUser = React.useCallback(async () => {
        let user;
        try{
            if(cookie !== undefined && cookie !== null) {
                user = await getMyUser()
            }
        }catch (e){
            removeCookie()
            return
        }
        if(user === null || user === undefined){
            console.log("awdwadddddd")
            removeCookie()
            return
        }
        updateCookie(dtoToUser(user))
    },[cookie])

    //Fetch the current user when the component is mounted
    // React.useEffect(() => {
    //     fetchCurrentUser()
    // } , [])


    const loginCB = React.useCallback(async (inputDTO: LoginInputDTO) => {
        const loginInfo = await login(inputDTO)
        if(!loginInfo) return
        const user = dtoToUser(await getMyUser())
        console.log("creting")
        createCookie(user, {
            path: '/' ,
            expires: new Date(Date.now()  + loginInfo.expiresIn - COOKIE_EXPIRE_OFFSET) //-10 secs to make sure it expires before the real auth expires
        })
    }, [])

    const logoutCB = React.useCallback(async () => {
        removeCookie();
        await logout();
    }, [])

    const isLoggedIn = React.useMemo(() => {
        return (cookie !== undefined && cookie !== null)
    }, [cookie])

    const user = React.useMemo(() => {
        if(cookie === undefined || cookie === null) return null
        if(typeof cookie === "object") return cookie
        if(typeof cookie === "string") return JSON.parse(cookie)
    } , [cookie])

    return (
        <AuthContext.Provider value={{
            login : loginCB,
            logout : logoutCB,
            isLoggedIn : isLoggedIn,
            user : user,
            fetchCurrentUser : fetchCurrentUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth : () => AuthReturnProps = () => React.useContext(AuthContext)