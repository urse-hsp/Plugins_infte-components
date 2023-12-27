import { isAddress, toReturnState, type ReturnState } from '@infte/web3-utils';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useSingleResult, useWeb3Provider } from './index';
import { useTokenContract } from './userContract';

interface TokenType {
  symbol: string;
  decimals: number;
  name: string;
  address?: string;
}
export interface useTokenType extends ReturnState {
  value: TokenType;
}
export function useToken(tokenAddress?: string, Contract?: any): useTokenType {
  const address = isAddress(tokenAddress);
  const TokenContract = useTokenContract(address);
  const Contract_ = Contract || TokenContract;
  const { symbol } = useSingleResult(Contract_, 'symbol');
  const { decimals } = useSingleResult(Contract_, 'decimals');
  const { name } = useSingleResult(Contract_, 'name');

  return useMemo(() => {
    const data = {
      symbol,
      decimals,
      name,
      address,
    };
    return toReturnState(data);
  }, [symbol, decimals, name, tokenAddress]);
}

// 判断主网币,则返回当前链接的主网币
export function useCurrency(
  currencyId: string | undefined | number,
): useTokenType {
  const { networkChainsInfo, chainId } = useWeb3Provider();
  const isETH =
    currencyId === chainId ||
    currencyId === '0x0000000000000000000000000000000000000000';
  const { value: token } = useToken(isETH ? undefined : currencyId?.toString());

  return useMemo(() => {
    const data: any = isETH ? networkChainsInfo?.nativeCurrency : token;
    return toReturnState(data);
  }, [currencyId, token]);
}

// token余额
export const useCurrencyBalances = (tokenAddress?: string): ReturnState => {
  const { account } = useWeb3Provider();
  const address = isAddress(tokenAddress);
  const TokenContract = useTokenContract(address ?? undefined);
  const { decimals = 18 } = useSingleResult(TokenContract, 'decimals');
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
