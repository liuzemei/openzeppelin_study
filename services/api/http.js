import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
})

api.interceptors.request.use(config => {
  return config
})

api.interceptors.response.use(res => {
  const { status, msg, data } = res.data
  if (status === 0) return data
  else {

  }
  return res
})

