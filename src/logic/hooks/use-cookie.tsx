import * as React from "react";
import Cookies from "js-cookie"
import { constants } from "../../constants";


export default function useCookie(
    name : string,
    defaultValue : any | undefined = undefined,
    onCookieExpire : () => void = undefined
) {
    const [value, setValue] = React.useState(() => {
        const cookie = Cookies.get(name)
        if (cookie) return cookie
        if (defaultValue === undefined) {
            return null
        }

        Cookies.set(name, JSON.stringify(defaultValue))
        return defaultValue
    })
    const savedOptions = React.useRef()

    const createCookie = React.useCallback(
        (newValue, options) => {
            console.log(newValue)
            Cookies.set(name, JSON.stringify(newValue), options)
            savedOptions.current = options
            setValue(newValue)
        },
        [name]
    )

    const updateCookie = React.useCallback(
        (newValue) => {

            Cookies.set(name, JSON.stringify(newValue), savedOptions.current)
            setValue(newValue)
        }
    , [name, savedOptions.current])

    React.useEffect(() => {
        if(!value) return
        if(onCookieExpire === undefined) return

        const intervalID = setInterval(() => {
            const cookie = Cookies.get(name)
            if (cookie === undefined ) {
                console.log("cookie expired")
                clearInterval(intervalID)
                setValue(null)
                onCookieExpire()
            }
        },constants.cookie.USE_COOKIE_CHECK_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    },[value])

    const deleteCookie = React.useCallback(() => {
        Cookies.remove(name)
        setValue(null)
    }, [name])

    return [value, updateCookie, createCookie , deleteCookie]
}