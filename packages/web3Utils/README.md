# @infte/web3-utils 说明文档

web3 工具类函数

## isAddress

- 类型：(value: any, isAddress = true): string
- 判断地址是否正确

<!-- ## urf8_fex = (str: any) -->

## address_formatter

- 类型：(address: string, before: number = 6,after: number = 4): string
- 省略地址

## hash_formatter

- 类型：(hash: string,before: number = 8,after: number = 4): string
- 省略 hash

## getEthScanPath

- 类型：(url: string,data: string,type: ethScanPathType): string
- 获取 eth 浏览器地址

type 类型：'transaction' | 'token' | 'address' | 'block';

## toReturnState

- 类型：(value: MethodArg | undefined = undefined,methodName?: string): ReturnState
- 获取返回格式，用于处理 hooks 返回结果
