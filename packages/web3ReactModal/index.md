npm install @web3modal/ethereum @web3modal/react wagmi ethers@^5

Web3Modal：props
ethereumClient:{
locale: 'en-us' | 'zh-cn' | 'zh-hk' | string; 语言
network_id?: number | string | null; // 默认链
wallet_type?: WalletType; // 指定钱包类型，默认链接。不指定需要手动选择钱包
}
