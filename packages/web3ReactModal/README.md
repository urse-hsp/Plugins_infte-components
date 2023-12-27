## web3ReactModal 说明文档

### Web3Button 组件

- 负责链接钱包与切换卡包
- 参数: type?: 'connect' | 'change'; 链接/切换

### Web3Modal

整个插件实例

参数

1. ethereumClient
   - locale?: 'en-us' | 'zh-cn' | 'zh-hk' | string; // 默认语言
   - chainsList?: { // 支持的链列表
     - name: string;
     - chainId: number;
     - networkId: number;
     - contracts: any;
     - explorers: any[];
     - location_id: number;
     - rpc: string[];
     - nativeCurrency: Token;
   - }[]; // 支持的链
   - network_id?: number | string | null; // 默认链接的链
   - wallet_type?: WalletType = 'MetaMask' | 'BitKeep' | string;; // 指定钱包类-型，- 默认链接。不指定需要手动选择
2. openHashStorage 开启校验哈希本地缓存
3. children

- 其他配置：
- 默认自动链接 同时传入 network_id 与 wallet_type 参数，打开 app 就会自动链接钱包

### useWeb3Storage

web3 本地存储实例

### useWeb3Provider

web3 Provider 实例

### useAppHashState

交易哈希本地缓存实例

## hooks

1. useEthScanPath

- 回调：{
  - link = (hash: string, type: ethScanPathType): string
  - blank = (hash: string, type: ethScanPathType)
  - details_blank = (url: string, hash: string, type: ethScanPathType)
- }
- eth 浏览器地址 hooks

2. useSingleResult

- 类型：(contract: Contract | null | undefined,methodName: string,inputs?: MethodArg[])
- 合约单个调用返回

3. useHashMessage

- 回调：{
  - HashMessage = (hash: string,success_fn?: () => any,successText: string = successText_msg)
  - implementResult = async (props:
    - {
    - singleContract: any;
    - params?: any[];
    - successText?: string;
    - success_fn?: () => void;
    - error_fn?: (err: any) => void;
  - }
- )
- loading：boolean
- setLoading(bool:boolean)
- }

4. getSigner

- 类型：getSigner(library: any, account: string): any
- 返回一个新的 Signer 对象，它在发送交易时不执行额外的检查。 有关详细信息，请参阅 getUncheckedSigner。

5. getProviderOrSigner

- 类型：getProviderOrSigner(library: any, account?: string): any
- 处理 Provider/Signer

6. getContract

- 类型： getContract(address: string, // 合约地址 ABI: any,library: any,account?: string): Contract
- 创建合约

## hooks/useAccountOperation

1. useAccountOperation

- 回调 {
  - transfer = async (address: string, num: number, fn?: () => any),
  - getSigner,
  - loading,
- }

## hooks/userContract
