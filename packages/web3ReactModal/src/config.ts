import chains from './network.chains.list.json';

export interface contractsType {
  social: string;
}
export interface chainsType {
  name: string;
  chainId: number;
  networkId: number;
  contracts: contractsType;
}
interface BaseDataType {
  BaseLocale: string;
  BASE_NETWORK_ID: number;
  BASE_WALLET_TYPE: string;
  CHAIN_ID: number; // 默认链 ID
  chainsList: chainsType[];
}

const BaseData: any = {
  BASE_URL: '',
  CHAIN_ID: 65,
  chainsList: chains,
};
const { CHAIN_ID, chainsList } = BaseData;
const config: BaseDataType = {
  // 环境
  BaseLocale: 'zh_cn', // 默认语言

  // 钱包
  BASE_NETWORK_ID: CHAIN_ID,
  BASE_WALLET_TYPE: 'MetaMask',
  chainsList, // 支持链

  // 主网
  CHAIN_ID,
};
export default config;
