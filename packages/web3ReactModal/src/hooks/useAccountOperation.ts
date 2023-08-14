import { message } from 'antd';
import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useWeb3Provider } from '../index';
import { useHashMessage } from './index';

interface useAccountOperationProps {
  transfer: (address: string, num: number, fn?: () => any) => any;
  getSigner: () => any;
  loading: boolean;
}

export const useAccountOperation = (): useAccountOperationProps => {
  const { web3Provider, account } = useWeb3Provider();
  const { HashMessage } = useHashMessage();
  const [loading, setLoading] = useState<boolean>(false); // loading

  // 转账
  const transfer = async (address: string, num: number, fn?: () => any) => {
    const data = {
      to: address,
      value: ethers.utils.parseEther(num.toString()),
    };
    setLoading(true);
    try {
      const res = await web3Provider.getSigner().sendTransaction(data);
      const hash = res?.hash;
      if (hash) {
        HashMessage(hash, () => {
          setLoading(false);
          fn?.();
        });
      }
    } catch (error) {
      const err: any = error;
      if (err?.code === -32603 && err?.data?.code === -32000) {
        message.error('Insufficient Balance');
      }
      setLoading(false);
    }
  };

  // 签名
  const getSigner = useCallback(async () => {
    try {
      const msg = 'Hello Nest!';
      const signature = await web3Provider.getSigner().signMessage(msg);
      return {
        address: account,
        signature,
        message: msg,
      };
    } catch (e) {
      return false;
    }
  }, [web3Provider, account]);

  return useMemo(() => {
    return {
      transfer,
      getSigner,
      loading,
    };
  }, [loading, getSigner]);
};

export default useAccountOperation;
