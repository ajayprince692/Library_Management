import axios from "axios";
let API_URL = "https://659935c9a20d3dc41cef6114.mockapi.io"


let ApiService=axios.create({
    baseURL:API_URL,
    headers:{
            "Content-Type" : "application/json"
    }
})

export default ApiService