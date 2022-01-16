import { api } from './http'




export const getNftList = (timestamp, page_size) => api.get(`/nft/list`, { timestamp, page_size })

export const postNftMint = address => api.post(`/nft/mint`, { address })

/**
 * 
 * @param {{ order_uuid:"",bundle_nft_id:"",order_type:0,seller_id:0,price:0,currency:"",seller_sign:"",deadline:0}} data 
 * @returns {Promise<{order_id:0}>}
 */
export const postNftSell = data => api.post(`/nft/sell`, data)


/**
 * 
 * @param {string} order_id 
 * @returns {{order_uuid:"",bundle_artwork_sku_id:"",order_type:0,seller_id:0,price:0,currency:"",deadline:0,status: 0}}
 */
export const getNftSellByID = order_id => api.get(`/nft/sell/${order_id}`)


/**
 * 
 * @param {string} order_id 
 * @returns {{order_uuid:"",bundle_artwork_sku_id:"",order_type:0,seller_id:0,price:0,currency:"",deadline:0,status: 0}}
 */
export const getNftBuyByID = order_id => api.get(`/nft/buy/${order_id}`)

export const postCancelOrderByID = order_id => api.post(`/nft/cancel/${order_id}`)