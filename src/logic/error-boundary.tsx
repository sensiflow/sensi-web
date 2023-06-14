import * as React from "react";
import {useEffect, useState} from "react";
import {Problem} from "../api/dto/hypermedia/problem";
/*
export function WithErrorBoundary(wrappedComponent: JSX.Element) {
    console.log('LKSDFJNAKLNFJKLASNDKLANDSLKAN')
    return () => {
        const [error, setError] = useState<Problem>(null);
        console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAA');

        useEffect(() => {
            if (error !== null && error.status === 403) {
                console.log('FORBIDAO');
            }
        }, [error])

        try {
            return wrappedComponent;
        } catch (err) {
            setError(err);
        }
    }
}
*/