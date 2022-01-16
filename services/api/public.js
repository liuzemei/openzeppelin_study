import { api } from './http'

export const getContractInfo = () => api.get('/info')

/**
 * 
 * @returns {{timestamp_ms: 0}}
 */
export const getTimestamp = () => api.get(`/public/timestamp`)

export const getCurrencyList = network_name => api.get(`/currency/list`, { params: { network_name } })