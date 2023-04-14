import detectEthereumProvider from '@metamask/detect-provider';
import bitkeep from './images/bitkeep.png';
import metamask from './images/metamask.png';
import { localeKeys } from './locales/index';
import chains from './Web3Modal/network.chains.list.json';
import { getProvider as getBitKeepProvider } from './Web3Modal/Provider/BitKeep';

export type dataType<T> = Record<string, T>;
export interface contractsType {
  social: string;
}

type Token = {
  name: string;
  symbol: string;
  decimals: number;
};
export interface chainsType {
  name: string;
  chainId: number;
  networkId: number;
  contracts: contractsType;
  explorers: any[];
  location_id: number;
  rpc: string[];
  nativeCurrency: Token;
}
interface BaseDataType {
  chainsList: chainsType[];
  BaseLocale: localeKeys;
  BaseWalletType: WalletType;
}

export type WalletType = 'MetaMask' | 'BitKeep' | string;

export const WalletList: Record<
  WalletType,
  {
    logo: string;
    provider: any;
  }
> = {
  MetaMask: {
    logo: metamask,
    provider: detectEthereumProvider,
  },
  BitKeep: {
    logo: bitkeep,
    provider: getBitKeepProvider,
  },
};

const BaseData: any = {
  BASE_URL: '',
  CHAIN_ID: chains[0].chainId,
  chainsList: chains,
};
const { chainsList } = BaseData;
const config: BaseDataType = {
  // 环境
  BaseLocale: 'zh-cn', // 默认语言

  // 钱包
  chainsList, // 支持链
  BaseWalletType: 'MetaMask',
  // 主网
};
export default config;
