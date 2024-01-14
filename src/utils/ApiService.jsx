import axios from "axios";
let API_URL = "https://65981fb3668d248edf2428f7.mockapi.io/api/v2/Formix"


let ApiService=axios.create({
    baseURL:API_URL,
    headers:{
            "Content-Type" : "application/json"
    }
})

export default ApiService