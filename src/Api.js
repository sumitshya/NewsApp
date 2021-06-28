import axios from "axios";

let apiKey = 'd9b44aa25e4d49c9bfe751120d0278ff';

let API = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    headers: {
        'Content-Type': 'application/json'
    },
})

API.interceptors.request.use(config => {
    console.log('Request was sent')
    return config;
}, error => {
    return Promise.reject(error);
})

API.interceptors.response.use(response => {
    console.log('Response was received')
    return response;
}, error => {
    return  Promise.reject(error);
})

const api = {
    getNewsHeadlineByCountry(){
        return API.get(`top-headlines?country=us&category=business&apiKey=${apiKey}`)
    }
}

export default api;