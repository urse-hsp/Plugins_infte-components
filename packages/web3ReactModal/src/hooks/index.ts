import {
  getEthScanPath,
  hash_formatter,
  isAddress,
  toReturnState,
  type ethScanPathType,
  type MethodArg,
} from '@infte/web3-utils';
import { notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useWeb3Provider } from '../Web3Modal';

import { ethers, type ethers as ethersType } from '@infte/web3-utils';
import { useAppHashState } from '../Web3Modal/appHashState';
type Contract = ethersType.Contract;

export { useWeb3Provider };

// to hash
export const useEthScanPath = () => {
  const { networkChainsInfo } = useWeb3Provider();
  const link = (hash: string, type: ethScanPathType): string => {
    return getEthScanPath(networkChainsInfo?.explorers[0].url, hash, type);
  };
  const blank = (hash: string, type: ethScanPathType) => {
    window.open(link(hash, type), '_blank');
  };

  const details_blank = (url: string, hash: string, type: ethScanPathType) => {
    window.open(getEthScanPath(url, hash, type), '_blank');
  };
  return {
    blank,
    link,
    details_blank,
  };
};

// 单个调用结果
export function useSingleResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: MethodArg[],
): any {
  const { hashAddress } = useAppHashState();
  const [data, setData] = useState<MethodArg | undefined>(undefined);

  // const fragment = useMemo(
  //   () => contract?.interface?.getFunction(methodName.trim()),
  //   [contract, methodName],
  // );

  useEffect(() => {
    (async () => {
      if (!contract?.[methodName.trim()]) return null;
      try {
        const res = await contract?.[methodName.trim()](...(inputs ?? []));
        setData(res);
      } catch (error) {}
    })();
  }, [contract, inputs?.length, hashAddress.length]);

  return useMemo(() => {
    return toReturnState(data, methodName);
  }, [data]);
}

interface implementResultProps {
  singleContract: any; // 合约
  params?: any[]; // 参数
  successText?: string; // 成功文案
  success_fn?: () => void; // 成功调用
  error_fn?: (err: any) => void; // 失败调用
  getHash?: (str: any) => void; // 立即执行函数返回hash
}
// message
export const useHashMessage = () => {
  const { web3Provider: provider } = useWeb3Provider();
  const { setLoadingHashAddress, changeHashAddress, hashLoadingAddress } =
    useAppHashState();
  const [loading, setLoading] = useState<boolean>(false); // loading
  const { blank } = useEthScanPath();
  const successText_msg = 'Confirmed on the chain';

  // message
  const HashMessage = (
    hash: string,
    success_fn?: () => any,
    successText: string = successText_msg,
  ) => {
    try {
      // web3Provider.once
      provider?.waitForTransaction(hash).then(() => {
        notification.success({
          key: hash,
          placement: 'topRight',
          message: successText,
          description: `View on browser：${hash_formatter(hash)}`,
          onClick: () => {
            blank(hash, 'transaction');
          },
        });
        changeHashAddress(hash);
        setLoading(false);
        success_fn?.();
      });
    } catch (error) {}
  };

  useEffect(() => {
    const lists: any = hashLoadingAddress;
    // eslint-disable-next-line array-callback-return
    lists.map((item: any) => {
      if (ethers.utils?.isHexString(item)) {
        HashMessage(item);
      } else {
        changeHashAddress(item, true);
      }
    });
  }, []);

  const implementResult = async (props: implementResultProps) => {
    const {
      singleContract,
      params = [],
      successText = successText_msg,
      success_fn,
      error_fn,
      getHash,
    } = props;

    if (!singleContract) return;
    setLoading(true);
    try {
      const res = await singleContract?.(...params);
      const hash = res?.hash;
      getHash?.(hash);
      if (hash) {
        setLoadingHashAddress(hash);
        HashMessage(hash, success_fn, successText);
      }
    } catch (error: any) {
      setLoading(false);
      error_fn?.(error);
    }
  };
  return useMemo(() => {
    return { HashMessage, implementResult, loading, setLoading };
  }, [loading]);
};

// 返回一个新的 Signer 对象，它在发送交易时不执行额外的检查。 有关详细信息，请参阅 getUncheckedSigner。
export function getSigner(library: any, account: string): any {
  return library.getSigner(account).connectUnchecked();
}

// 处理Provider/Signer
export function getProviderOrSigner(library: any, account?: string): any {
  return account ? getSigner(library, account) : library;
}

// 创建合约
export function getContract(
  address: string, // 合约地址
  ABI: any,
  library: any,
  account?: string,
): Contract {
  const AddressZero: string = '0x0000000000000000000000000000000000000000';
  if (!isAddress(address, true) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account),
  );
}
