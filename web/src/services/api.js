// Axios is HTTP Client which can communicate with the backend
import axios from "axios"

// Creates an api with axios
const api = axios.create({
    baseURL: "http://localhost:3333"
})

// export API
export default api
