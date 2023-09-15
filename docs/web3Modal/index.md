# web3

## demo

npm install @infte/web3modal-react

```jsx
import { useEffect, useState } from 'react';
import {
  useAppHashState,
  useWeb3Provider,
  Web3Button,
  Web3Modal
} from '@infte/web3modal-react';
import { Button } from 'antd';

function App() {
  const { connect, account, disconnect, chainId, loading }: any =
    useWeb3Provider();

  return (
    <div className="App">
      <Web3Button />
      *****
      <Web3Button type="change" />

      <br/>
      <br/>

      {loading ? (
        'loading'
      ) : (
        <>
          <Button
            onClick={() => {
              connect?.(12306);
            }}
          >
            12306
          </Button>
          <Button
            onClick={() => {
              connect?.(65);
            }}
          >
            65
          </Button>
        </>
      )}
      <Button onClick={disconnect}>退出</Button>
      <br/>
      {account} ***** {chainId}
      {/* <div onClick={getSigner}>签名</div> */}
    </div>
  );
}


export default () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
   <Web3Modal
    ethereumClient={{
      locale: 'zh-cn',
      network_id: 12306,
    }}
  >
    <App/>
  </Web3Modal>,
  );
};
```

## web3ReactModal 说明文档

### Web3Button 组件

- 负责链接钱包与切换卡包
- 参数: type?: 'connect' | 'change'; 链接/切换

### Web3Modal

整个插件实例

参数

1. ethereumClient
   - locale?: 'en-us' | 'zh-cn' | 'zh-hk' | string; // 语言
   - chainsList?: {
     - name: string;
     - chainId: number;
     - networkId: number;
     - contracts: any;
     - explorers: any[];
     - location_id: number;
     - rpc: string[];
     - nativeCurrency: Token;
   - }[]; // 支持的链
   - reload?: boolean; // 刷新页面
   - network_id?: number | string | null; // 默认链
   - wallet_type?: WalletType = 'MetaMask' | 'BitKeep' | string;; // 指定钱包类-型，- 默认链接。不指定需要手动选择
2. openHashStorage 开启校验哈希本地缓存
3. children dom

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

1. useContract

- 类型 useContract(address: string | undefined,ABI: any,withSignerIfPossible?: boolean, // 签名): Contract | null
- 创建合约

2. useErcContract

- erc20 合约

3. useTokenContract

- 类型：useTokenContract(tokenAddress?: string,withSignerIfPossible?: boolean)
- erc20 用户合约（用户查询 token 合约。）

## utils 工具类

- @infte/web3-utils 说明文档
- npm install @infte/web3-utils

### @infte/web3-utils 说明文档

web3 工具类函数

### isAddress

- 类型：(value: any, isAddress = true): string
- 判断地址是否正确

<!-- ### urf8_fex = (str: any) -->

### address_formatter

- 类型：(address: string, before: number = 6,after: number = 4): string
- 省略地址

### hash_formatter

- 类型：(hash: string,before: number = 8,after: number = 4): string
- 省略 hash

### getEthScanPath

- 类型：(url: string,data: string,type: ethScanPathType): string
- 获取 eth 浏览器地址

type 类型：'transaction' | 'token' | 'address' | 'block';

### toReturnState

- 类型：(value: MethodArg | undefined = undefined,methodName?: string): ReturnState
- 获取返回格式，用于处理 hooks 返回结果
