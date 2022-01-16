import { api } from './http'

// 获取用户信息
export const isRegister = () => api.post('/index')