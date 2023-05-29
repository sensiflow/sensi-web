import * as React from "react"
import { getUser } from "../../api/fake/fake-api"
import {User} from "../../model/user";
import useCookie from "../hooks/useCookie";
import {AUTH_COOKIE_NAME} from "./auth-context";
import useLocalStorageState from 'use-local-storage-state'


export const CurrentUserContext = React.createContext(null)


/**
 * The provider for the current user context where the current user is stored and provides a function to fetch the current user
 * This component should be placed at the root of the application
 * It uses the useLocalStorageState hook to store the current user in the local storage
 * It allows to use the useCurrentUser hook to access the current user down the component tree
 * b
 * @param children the children of the component
 */
export const CurrentUserProvider = ({children } : { children : React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useLocalStorageState("currentUser", null)

  const [cookie, __, _] = useCookie(AUTH_COOKIE_NAME)

  const UID = React.useMemo(() => {
    return parseInt(cookie) ;
  }, [cookie])

  //TODO: why localstorage: sessionsstorage is cleared when the tab is closed, localstorage has no expiry date
  //TODO: why cookie with id is on cookie, and user is on localstorage: because the cookie has an expiry that is used to know when the real authentication with the api is over, has this id cookie does not provide auth, its merely information to know when we are out of auth

  /**
   * Fetches the current user from the api and stores it in the local storage
   * @param argUID the id of the user to fetch, if not provided, the id is taken from the cookie, if this id is -1, the current user is set to null
   */
  const fetchCurrentUser = React.useCallback(async ( argUID : number | undefined = undefined) => {
    const uid =  argUID || UID

    if(!uid || uid === -1){
      setCurrentUser(null)
      return
    }
    const user = await getUser(uid)
    console.log("fetchCurrentUser", user)
    if(currentUser === user) return
    console.log("after")
    setCurrentUser(user)
  },[UID])

  //Fetch the current user when the component is mounted
    React.useEffect(() => {
        fetchCurrentUser()
    } , [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

interface CurrentUserReturnProps {
    currentUser: User | null;
    fetchCurrentUser: (argUID?: number | undefined) => Promise<void>;
}


export const useCurrentUser : () => CurrentUserReturnProps = () => React.useContext(CurrentUserContext)