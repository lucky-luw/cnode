import axios from 'axios'
const request =axios.create({
    baseURL:' https://cnodejs.org/api/v1',
    methods:'GET'
}) 
request.interceptors.request.use(
    config => {
        return config
    }
)
request.interceptors.response.use(
    res => {
       return res.data
    },
    error => {
        return new Promise.reject(error)
    }
)
export default request