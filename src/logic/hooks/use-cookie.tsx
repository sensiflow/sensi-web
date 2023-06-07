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
        Cookies.set(name, defaultValue)
        return defaultValue
    })

    const updateCookie = React.useCallback(
        (newValue, options) => {
            Cookies.set(name, newValue, options)
            setValue(newValue)
        },
        [name]
    )

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

    return [value, updateCookie, deleteCookie]
}