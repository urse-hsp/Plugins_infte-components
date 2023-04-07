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
  BASE_NETWORK_ID: number;
  BASE_WALLET_TYPE: string;
  chainsList: chainsType[];
}

const BaseData: any = {
  BASE_URL: '',
  CHAIN_ID: chains[0].chainId,
  chainsList: chains,
};
const { CHAIN_ID, chainsList } = BaseData;
const config: BaseDataType = {
  // 环境
  // BaseLocale: 'zh_cn', // 默认语言

  // 钱包
  BASE_NETWORK_ID: CHAIN_ID,
  BASE_WALLET_TYPE: 'MetaMask',
  chainsList, // 支持链
  // 主网
};
export default config;
