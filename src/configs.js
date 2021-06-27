import Api from "./utils/api"

const API_URL = process.env.REACT_APP_API_URL

console.log(API_URL)
export const api = new Api({
    baseURL: API_URL
})

export default {
    API_URL
}