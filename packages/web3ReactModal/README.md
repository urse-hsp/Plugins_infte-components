# web3ReactModal 说明文档

<!-- ## Web3Button -->

### Web3Button 组件 负责链接钱包与切换卡包

参数:

1. type?: 'connect' | 'change'; 链接/切换

### useWeb3Provider web3 Provider 实例

### Web3Modal Provider 整个插件实例

参数

1. ethereumClient
   - locale?: 'en-us' | 'zh-cn' | 'zh-hk' | string; // 语言
   - chainsList?: {
     - name: string;
     - chainId: number;
     - networkId: number;
     - contracts: contractsType;
     - explorers: any[];
     - location_id: number;
     - rpc: string[];
     - nativeCurrency: Token;
   - }[]; // 支持的链
   - reload?: boolean; // 刷新页面
   - network_id?: number | string | null; // 默认链
   - wallet_type?: WalletType = 'MetaMask' | 'BitKeep' | string;; // 指定钱包类-型，- 默认链接。不指定需要手动选择

### useWeb3Storage web3 本地存储实例

# 打包报错

打包报错 升级 @infte/utils @infte/web3-utils

包
"module": "dist/index.js",
"types": "dist/index.d.ts",
