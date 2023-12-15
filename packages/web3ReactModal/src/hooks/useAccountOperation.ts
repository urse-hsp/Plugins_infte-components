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

// 账户操作 / useAccountOperation
// SPDX-License-Identifier:MIT
// pragma solidity 0.8.17;

// interface IERC20 {
//     //发行的代币总量
//     function totalSupply() external view returns (uint256);
//     //某地址余额
//     function balanceOf(address account) external view returns (uint256);
//     //从当前账户对某个地址转amount的钱
//     function transfer(address account, uint256 amount) external returns (bool);
//     //授权某个账户可以用你的钱（用多少钱是指定的）
//     function approve(address spender, uint256 amount) external returns (bool);
//     //你授权的账户还可以有多少你授权的钱可以用
//     function allowance(address owner, address spender) external view returns (uint256);
//     //授权用户的转账方法，只针对授权用户使用
//     function transferFrom(address from,address to,uint256 amount) external returns (bool);
//     //转账时触发转账事件
//     event Transfer(address indexed from, address indexed to, uint256 value);
//     //授权时触发授权事件
//     event Approval(address indexed owner, address indexed spender, uint256 value);
// }

// 调用allowance方法来获取授权额度。你需要提供拥有代币的地址（所有者）和接收授权的地址（spender）。例如：
// const ownerAddress = '0xabcdef123456789...'; // 所有者地址
// const spenderAddress = '0x987654321fedcba...'; // 接收授权的地址
// const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
// console.log('Allowance:', allowance.toString());
