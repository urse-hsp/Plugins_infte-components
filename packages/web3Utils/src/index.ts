import { ethers } from 'ethers';

export { ethers };

// 判断地址是否正确
export function isAddress(value: any, isAddress = true): string {
  try {
    if (isAddress) {
      return ethers?.utils.getAddress(value);
    } else {
      return ethers?.utils.getContractAddress(value);
    }
  } catch {
    return '';
  }
}

export const urf8_fex = (str: any) => {
  if (
    ethers.utils.isBytes(str) ||
    ethers.utils.isBytesLike(str) ||
    ethers.utils.isHexString(str)
  ) {
    const Uint8Array = ethers.utils.arrayify(str);
    return ethers.utils.toUtf8String(Uint8Array);
  } else {
    const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(str));
    return hex;
  }
};

export function address_formatter(
  address: string,
  before: number = 6,
  after: number = 4,
) {
  if (!address) return address;
  return `${address.slice(0, before)}...${address.slice(-after)}`;
}

export function hash_formatter(
  hash: string,
  before: number = 8,
  after: number = 4,
) {
  if (hash?.length <= 12 || !hash) return hash;
  return `${hash.slice(0, before)}...${hash.slice(-after)}`;
}

export type ethScanPathType = 'transaction' | 'token' | 'address';
export function getEthScanPath(
  url: string,
  data: string,
  type: ethScanPathType,
): string {
  const prefix = url;
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

type dataType<T> = Record<string, T>;
export type MethodArg = dataType<any> | string | number; // | BigNumber;
export interface ReturnState {
  readonly value: any; // MethodArg | undefined;
  readonly loading: boolean;
  readonly error: boolean;
  [key: string]: any;
}

const INVALID_CALL_STATE: ReturnState = {
  value: undefined,
  loading: false,
  error: false,
};
// 状态
export function toReturnState(
  value: MethodArg | undefined = undefined,
  methodName?: string,
): ReturnState {
  if (!value) return INVALID_CALL_STATE;

  const obj_data = Object.entries(value)
    .map((item) => item[1])
    .some((item) => (item ?? '') !== ''); // (item ?? '') !== '' // 判断是否是对象，并且属性是否有值[兼容字符串等]

  if (value) {
    const data: ReturnState = {
      loading: obj_data,
      error: false,
      value: ethers.BigNumber.isBigNumber(value) ? value.toString() : value,
    };
    if (methodName) {
      data[methodName] = data.value;
    }
    return data;
  }

  return {
    ...INVALID_CALL_STATE,
    error: true,
  };
}

// export const digitalPrecision = (
//   num: string | number,
//   decimals: number,
//   isDiv?: boolean, // 默认乘
// ) => {
//   // 除法。 高精度小数转换阿拉伯数字
//   if (!num) {
//     return '';
//   }
//   if (isDiv) {
//     return BigNumberJs(num.toString())
//       .div(Math.pow(10, decimals))
//       .toFixed(config.precision)
//       .toString();
//   } else {
//     // 默认转高精度小数
//     return BigNumberJs(num.toString()).times(Math.pow(10, decimals)).toFixed();
//   }
// };

// // 处理对象BigNumber数据
// export const analysisBigNumber = (
//   data = {},
//   fn = (e: any) => {
//     return e;
//   },
// ) => {
//   return Object.entries(data)
//     .map((item: any) => ({
//       [item[0]]: fn(item[1].toString()),
//     }))
//     .reduce(
//       (acc: any, cur: any) => ({
//         ...acc,
//         ...cur,
//       }),
//       {},
//     );
// };
