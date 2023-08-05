import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './token'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  config.headers.token = GET_TOKEN()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data //简化数据
  },
  (error) => {
    let msg = ''
    switch (error.response.status) {
      case 401:
        msg = 'token过期!'
        break
      case 403:
        msg = '权限不足!'
        break
      case 404:
        msg = '请求地址出错!'
        break
      case 500:
        msg = '服务器出错!'
        break
      default:
        msg = '网络出错!'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default request
