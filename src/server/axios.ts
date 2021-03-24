import axios from 'axios'
import QS from 'qs'
//请求超时时间
axios.defaults.timeout = 5000
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.resolve(error.response)
    }
)
export function post(url: string, params: any) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function get(url: string, params: any) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}
//封装请求，在组件中调用该方法即可
export default {
    axios,
    get,
    post
}
