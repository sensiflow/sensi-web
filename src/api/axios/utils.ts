import axios, { AxiosError } from 'axios';
import {Problem} from "../dto/hypermedia/problem";

const basePath = "/api/v1"
const apiURL = `http://localhost:8090`
const baseUrl = `${apiURL}${basePath}`

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

declare global{
    interface Promise<T> {
        catchAndThrowAsProblem(): Promise<T>
    }
}

Promise.prototype.catchAndThrowAsProblem = function() {
    return this.catch((e) => {
        if(e instanceof AxiosError) {
            console.log({title: e.message, status: e.response.status} as Problem)
            throw {title: e.message, status: e.response.status} as Problem
        }
        const problem: Problem = e.response.data as Problem
        console.log(problem)
        problem.status = e.response.status
        throw problem
    })
}

export {}