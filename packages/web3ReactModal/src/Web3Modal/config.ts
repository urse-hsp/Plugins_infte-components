import { localeKeys } from '../locales/index';
import chains from '../Web3Modal/network.chains.list.json';

export interface contractsType {
  social: string;
}
export interface chainsType {
  name: string;
  chainId: number;
  networkId: number;
  contracts: contractsType;
  explorers: any[];
  location_id: number;
}
interface BaseDataType {
  chainsList: chainsType[];
  BaseLocale: localeKeys;
}

const BaseData: any = {
  BASE_URL: '',
  CHAIN_ID: chains[0].chainId,
  chainsList: chains,
};
const { chainsList } = BaseData;
const config: BaseDataType = {
  // 环境
  BaseLocale: 'zh_cn', // 默认语言

  // 钱包
  chainsList, // 支持链
  // 主网
};
export default config;
