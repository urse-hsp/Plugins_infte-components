import { toReturnState, type ReturnState } from '@infte/web3-utils';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useSingleResult, useWeb3Provider } from './index';
import { useTokenContract } from './userContract';

export function useToken(tokenAddress?: string): ReturnState {
  const TokenContract = useTokenContract(tokenAddress);
  const { symbol } = useSingleResult(TokenContract, 'symbol');
  const { decimals } = useSingleResult(TokenContract, 'decimals');
  const { name } = useSingleResult(TokenContract, 'name');

  return useMemo(() => {
    const data = {
      symbol,
      decimals,
      name,
      address: tokenAddress,
    };
    return toReturnState(data);
  }, [symbol, decimals, name, tokenAddress]);
}

// token余额
export const useCurrencyBalances = (tokenAddress?: string): ReturnState => {
  const { account } = useWeb3Provider();

  const TokenContract = useTokenContract(tokenAddress ?? undefined);
  const { decimals } = useSingleResult(TokenContract, 'decimals');
  const { balanceOf } = useSingleResult(
    TokenContract,
    'balanceOf',
    account ? [account] : [],
  );

  return useMemo(() => {
    const data = {
      balanceOf: balanceOf ? ethers.utils.formatEther(balanceOf) : '',
      balances: balanceOf
        ? BigNumber(balanceOf).div(Math.pow(10, decimals)).toFixed()
        : '',
    };

    return toReturnState(data);
  }, [decimals, balanceOf]);
};

// eth余额
export const useETHBalance = () => {
  const { web3Provider, account } = useWeb3Provider();
  const { getBalance } = useSingleResult(
    web3Provider ?? undefined,
    'getBalance',
    [account],
  ); // 用户的余额

  return useMemo(() => {
    return getBalance ? ethers.utils.formatEther(getBalance) : '';
  }, [getBalance, account, web3Provider]);
};
