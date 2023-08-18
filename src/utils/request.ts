import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './token'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  console.log('请求配置：', config)
  config.headers.token = GET_TOKEN()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    console.log(`响应数据：`, res.data)
    return res.data //简化数据
  },
  (error) => {
    console.error(error)
    if (error.code === 'ECONNABORTED') {
      ElMessage({
        type: 'error',
        message: '连接超时！',
      })
      return Promise.reject(error)
    }
    if (!error.response) return Promise.reject(error)
    let msg
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
