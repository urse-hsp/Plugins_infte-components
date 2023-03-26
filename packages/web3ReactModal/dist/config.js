import chains from "./network.chains.list.json";
var BaseData = {
  BASE_URL: '',
  CHAIN_ID: 65,
  chainsList: chains
};
var CHAIN_ID = BaseData.CHAIN_ID,
  chainsList = BaseData.chainsList;
var config = {
  // 环境
  BaseLocale: 'zh_cn',
  // 默认语言

  // 钱包
  BASE_NETWORK_ID: CHAIN_ID,
  BASE_WALLET_TYPE: 'MetaMask',
  chainsList: chainsList,
  // 支持链

  // 主网
  CHAIN_ID: CHAIN_ID
};
export default config;