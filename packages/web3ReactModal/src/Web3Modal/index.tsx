import { isAddress } from '@infte/web3-utils';
import detectEthereumProvider from '@metamask/detect-provider';
import { message } from 'antd';
import { ethers } from 'ethers';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import resources from '../locales';
import { localeKeys } from '../locales/index';
import config, { type chainsType, type contractsType } from './config';
import Storage, { storageInitialStates } from './storage';

export type dataType<T> = Record<string, T>;

export type WalletType = string;
type WalletProiderType = Record<WalletType, any>;
const WalletProiderData: WalletProiderType = {
  MetaMask: detectEthereumProvider,
};

type catchMsgType = dataType<string>;

const catchMsg: catchMsgType = {
  '-32002': 'Please confirm your actions in MetaMask',
};

interface web3HookType {
  web3Provider: any; // Web3Provider
  WalletProider: any; // Provider 链实例
  chainId: number | undefined; // chainId
  account: string; // 账户ox
  active: boolean; // 是否链接
  loading: boolean; // loading
  connect: (network_id?: number, wallet_type?: WalletType) => any;
  disconnect: () => any;
  networkChainsInfo: chainsType | undefined;
  contracts: contractsType | undefined;
}

type initialState = {
  chainsList?: chainsType[]; // 支持的链
  reload?: boolean; // 刷新页面
  locale?: localeKeys; // 语言
};

const BaseLocale = config.BaseLocale;
const BaseinitialState: initialState = {
  chainsList: config.chainsList,
  reload: false,
  locale: BaseLocale,
};

const useWeb3Hook = (props?: initialState): web3HookType => {
  const initialData: initialState = Object.assign({}, BaseinitialState, props);
  const { chainsList = [], reload, locale = BaseLocale } = initialData;

  // Web3
  const [web3Provider, setWeb3Provider] = useState<any>(null);
  const [WalletProider, setWalletProider] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [networkChainsInfo, setNetworkChainsInfo] = useState<
    chainsType | undefined
  >(undefined);
  const [contracts, setContracts] = useState<contractsType | undefined>(
    undefined,
  );

  const { walletType, networkId, setNetworkId, setWalletType } =
    Storage.useContainer();

  const t = (str: string) => {
    return resources[locale][str];
  };

  const setProviderChainId = (chainId: string) => {
    return Number(
      chainId.toString().indexOf('0x') === 0 ? parseInt(chainId, 16) : chainId,
    );
  };

  const connector = useCallback(
    async (
      chainsId: number,
      wallet_type: WalletType,
      auto_connect?: boolean,
    ) => {
      setLoading(true);
      const network_id: number = Number(chainsId);

      // 限制支持链
      const chainsInfo: any = chainsList.find(
        (item: any) => item.networkId === Number(network_id),
      );

      if (chainsInfo) {
        // 匹配对应钱包Provider
        try {
          let providerInstance: any = null; // 钱包实例 provider
          let account: any = []; // ox账户

          // WalletProider
          providerInstance = await WalletProiderData?.[wallet_type](); // eth实例 window.ethereum

          // 解锁 MateMask
          if (providerInstance) {
            account = (
              await providerInstance.request({
                method: 'eth_requestAccounts',
              })
            )[0];
          } else {
            if (!auto_connect) message.error(`Please install ${wallet_type} !`);
            return;
          }

          // 切换网络
          const walletChainId = await providerInstance.request({
            method: 'eth_chainId',
          });
          const providerChainId: number = setProviderChainId(walletChainId);

          // Change to current network/更改为当前网络
          if (network_id !== providerChainId) {
            const chainId_to16 = `0x${network_id.toString(16)}`;
            try {
              await providerInstance.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId_to16 }],
              });
            } catch (switchError: any) {
              // This error code indicates that the chain has not been added to MetaMask./此错误代码表示链尚未添加到MetaMask。
              if (switchError.code === 4902) {
                try {
                  const params = {
                    chainId: chainId_to16,
                    chainName: chainsInfo.name,
                    nativeCurrency: chainsInfo.nativeCurrency,
                    rpcUrls: chainsInfo.rpc,
                    blockExplorerUrls: [chainsInfo.explorers[0]?.url],
                  };
                  await providerInstance.request({
                    method: 'wallet_addEthereumChain',
                    params: [params],
                  });
                } catch (addError: any) {
                  message.error(addError.message);
                  return addError.message;
                }
              } else if (switchError.code === 4001) {
                message.error(t('You denied the "Switch network" request'));
                return;
              } else if (switchError.code === -32002) {
                message.destroy(
                  t(
                    'A "Switch Network" request has been sent,Please confirm in your wallet.',
                  ),
                );
                return;
              } else {
                message.error(switchError.message);
                return switchError.message;
              }
            }
          }

          const web3instance = new ethers.providers.Web3Provider(
            providerInstance,
          );
          const Account = await web3instance._getAddress(account); // ethers.utils.getAddress

          // set
          setWeb3Provider(web3instance);
          setWalletProider(providerInstance);
          setAccount(Account);
          setChainId(providerChainId);
          setContracts(chainsInfo.contracts);
          setNetworkChainsInfo(chainsInfo);
          setLoading(false);
          setNetworkId(providerChainId);
          setWalletType(wallet_type);
          return null;
        } catch (e: any) {
          const messgae = t(catchMsg[e.message]) ?? e.message;
          message.error(messgae);
          return messgae;
        }
      } else {
        message.error(
          `${t(
            'Unsupported network, need to switch to supported network:',
          )}${network_id}`,
        );
      }
    },
    [],
  );

  const connect = (id = networkId, type = walletType) => {
    if (id && type) {
      connector(id, type);
    }
  };

  const disconnect = () => {
    setWeb3Provider(null);
    setWalletProider(null);
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setChainId(undefined);
  };

  useEffect(() => {
    if (networkId && walletType) {
      connector(networkId, walletType, false);
    }
  }, []);

  // 监听登录
  useEffect(() => {
    if (!WalletProider?.on) return;

    WalletProider.on('accountsChanged', (_accounts: any) => {
      if (!_accounts.length) return;
      if (account === _accounts[0]) return;
      const networkId: string = isAddress(_accounts[0]) ?? '';

      setAccount(networkId);
      if (reload) window.location.reload();
    });

    // 切换
    WalletProider.on('chainChanged', (chainId: any) => {
      const chainIdValue = setProviderChainId(chainId);
      const network: any = chainsList.find((element: any) => {
        return element.chainId === Number(chainIdValue);
      });
      setNetworkId(network.networkId);
      setChainId(network.networkId);
      if (reload) window.location.reload();
    });

    // disconnect
    // WalletProider?.on('disconnect', disconnect);
  }, [WalletProider, account, disconnect, setNetworkId]);

  return useMemo(() => {
    return {
      web3Provider,
      WalletProider,
      chainId,
      account,
      active: !!account,
      connect,
      disconnect,
      networkChainsInfo,
      contracts,
      loading,
    };
  }, [
    web3Provider,
    WalletProider,
    chainId,
    account,
    connect,
    disconnect,
    networkChainsInfo,
    contracts,
  ]);
};

const Web3Hook = createContainer(useWeb3Hook);

export const useWeb3Provider = (): web3HookType => {
  const data = Web3Hook.useContainer();
  return useMemo(() => {
    return data;
  }, [data]);
};

interface ethereumClient extends initialState, storageInitialStates {
  locale?: localeKeys; // 语言
}

interface Web3ModalType {
  children: ReactNode;
  ethereumClient: ethereumClient;
}

export function Web3Modal(props: Web3ModalType) {
  const { children, ethereumClient } = props;
  return (
    <Storage.Provider initialState={ethereumClient}>
      <Web3Hook.Provider initialState={ethereumClient}>
        {children}
      </Web3Hook.Provider>
    </Storage.Provider>
  );
}

export default Web3Modal;
