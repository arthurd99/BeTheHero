// Axios is HTTP Client which can communicate with the backend
import axios from "axios"

// Creates an api with axios
const api = axios.create({
    // IMPORTANT!!!!!
    // baseURL MUST be your computer's IP
    baseURL: "http://192.168.2.105:3333"
})

// Exports api
export default api
