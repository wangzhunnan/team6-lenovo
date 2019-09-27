import axios from 'axios'

// 创建request对象
const request = axios.create({
    baseURL: 'http://10.12.1.193:9090/v2.0/lls',//基准URL
    withCredentials:true//每次发送请求时，是否需要携带浏览器cookie信息
})

export default request;
