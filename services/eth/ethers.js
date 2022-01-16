import BigNumber from 'bignumber.js'
import { ethers, utils } from 'ethers'
import Web3Modal from "web3modal"

export const formatEth = async (v) =>
  utils.formatEther(v)

export const formatDecimal = (v, d) =>
  new BigNumber(v).times(10 ** d).toString()

export const formatPrice = v =>
  new BigNumber(v).toString()

export const getSigner = async () => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  return provider.getSigner()
}

export const getContract = async (addr, abi) => {
  const signer = await getSigner()
  return new ethers.Contract(addr, abi, signer)
}

export const signMessage = async (msg) => {
  msg = utils.arrayify(msg)
  const signer = await getSigner()
  return signer.signMessage(msg)
}

export const getOwner = async _contract => {
  const { contract_abi, contract_address } = _contract.contract_info
  const contract = await getContract(contract_address, contract_abi)
  const tx = await contract.owner()
  return tx
}
