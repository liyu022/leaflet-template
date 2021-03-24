import axios from 'axios'

const baseURL = '/api'

const service = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 10000 // 请求超时时间
})

// 发送拦截
service.interceptors.request.use(config => {
  return config
},err=>{
  console.log(err);
})

// 响应拦截
service.interceptors.response.use((response) => {
  return response.data
},err=>{
  console.log(err);
})

export default service
