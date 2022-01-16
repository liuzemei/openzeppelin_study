import { formatDecimal, formatPrice, getContract, signMessage } from '.'
import { utils } from 'ethers'
import nftABI from './nftABI.json'


export const getListingSign = async (item, decimal) => {
  let { seller_address, contract_address, token_id, price } = item
  price = formatDecimal(price, decimal)
  console.log([seller_address, contract_address, token_id, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", price, 1])
  let msg = utils.keccak256(
    utils.solidityPack(
      ["address", "address", "uint256", "address", "uint256", "uint8"],
      [seller_address, contract_address, token_id, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", price, 1]
    )
  )
  const sign = await signMessage(msg)
  return sign
}

export const buyNFT = async (
  { contract_abi, contract_address },
  { input, sellerSig, validatorSig },
  decimal) => {
  const contract = await getContract(contract_address, contract_abi)
  let { price } = input
  input.price = formatDecimal(price, decimal)
  const payPrice = formatPrice(price)
  const tx = await contract.buyNFT(input, sellerSig, validatorSig, {
    value: utils.parseEther(payPrice),
    gasLimit: 2000000,
    gasPrice: utils.parseUnits('10.0', 'gwei')
  })
  await tx.wait()
}

export const approve = async (item, market_contract_addr) => {
  const { contract_address, token_id } = item
  const nftContract = await getContract(contract_address, nftABI)
  const tx = await nftContract.approve(market_contract_addr, token_id)
  await tx.wait()
}

export const cancelOrder = async (
  { contract_abi, contract_address },
  { input, sellerSig },
  decimal) => {
  const contract = await getContract(contract_address, contract_abi)
  input.price = formatDecimal(input.price, decimal)
  const tx = await contract.cancelOrder(input, sellerSig, {
    gasLimit: 2000000,
    gasPrice: utils.parseUnits('10.0', 'gwei')
  })
  await tx.wait()
}