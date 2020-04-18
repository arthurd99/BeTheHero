// Axios is HTTP Client which can communicate with the backend
import axios from "axios"

// Creates an api with axios
const api = axios.create({
    baseURL: "http://192.168.0.111:3333"
})

// Exports api
export default api
