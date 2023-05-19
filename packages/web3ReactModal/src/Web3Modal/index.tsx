import { isAddress } from '@infte/web3-utils';
import { message } from 'antd';
import { ethers } from 'ethers';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import config, {
  WalletList,
  WalletType,
  type chainsType,
  type contractsType,
} from '../config';
import resources from '../locales';
import { localeKeys } from '../locales/index';
import Storage, { storageInitialStates } from './storage';

export type dataType<T> = Record<string, T>;

const WalletProiderData = WalletList;

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
  connect: (
    network_id?: number,
    wallet_type?: WalletType,
    auto_connect?: boolean,
    fn?: () => void,
  ) => any;
  disconnect: () => any;
  networkChainsInfo: chainsType | undefined;
  contracts: contractsType | undefined;
}

type initialState = {
  chainsList?: chainsType[]; // 支持的链
  reload?: boolean; // 刷新页面
  // autoConnector?: boolean;
};

const BaseLocale = config.BaseLocale;
const BaseinitialState: initialState = {
  chainsList: config.chainsList,
  reload: false,
  // autoConnector: false,
};

const useWeb3Hook = (props?: initialState): web3HookType => {
  const initialData: initialState = Object.assign({}, BaseinitialState, props);
  const { chainsList = [], reload } = initialData;

  // Web3
  const [web3Provider, setWeb3Provider] = useState<any>(null);
  const [WalletProider, setWalletProider] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const [networkChainsInfo, setNetworkChainsInfo] = useState<
    chainsType | undefined
  >(undefined);
  const [contracts, setContracts] = useState<contractsType | undefined>(
    undefined,
  );

  const { walletType, networkId, setNetworkId, setWalletType, t } =
    Storage.useContainer();

  const setProviderChainId = (chainId: string) => {
    return Number(
      chainId.toString().indexOf('0x') === 0 ? parseInt(chainId, 16) : chainId,
    );
  };

  const setNetworkData = (data: chainsType) => {
    setChainId(data.chainId);
    setNetworkId(data.networkId);
    setContracts(data.contracts);
    setNetworkChainsInfo(data);
  };

  const connector = async (
    chainsId: number,
    wallet_type: WalletType,
    auto_connect?: boolean,
    fn?: () => void,
  ) => {
    if (loading) return;
    setLoading(true);
    const network_id: number = Number(chainsId);
    // 限制支持链
    const chainsInfo: chainsType | undefined = chainsList.find(
      (item: chainsType) => {
        return item?.networkId === Number(network_id);
      },
    );

    if (chainsInfo) {
      // 匹配对应钱包Provider
      try {
        let providerInstance: any = null; // 钱包实例 provider
        let account: any = []; // ox账户

        // WalletProider
        providerInstance = await WalletProiderData?.[wallet_type].provider(); // eth实例 window.ethereum

        // 解锁 MateMask
        if (providerInstance) {
          account = (
            await providerInstance.request({
              method: 'eth_requestAccounts',
            })
          )[0];
        } else {
          if (!auto_connect) {
            message.error(`Please install ${wallet_type} !`);
          }
          setLoading(false);
          return;
        }

        // 获取当前在线网络
        const walletChainId = await providerInstance.request({
          method: 'eth_chainId',
        });
        const providerChainId: number = setProviderChainId(walletChainId);

        // 更改为当前网络
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
              // 添加网络
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
                setLoading(false);
                message.error(addError.message);
                return addError.message;
              }
            } else if (switchError.code === 4001) {
              setLoading(false);
              message.error(t('You denied the Switch network request'));
              return;
            } else if (switchError.code === -32002) {
              message.destroy(
                t(
                  'A Switch Network request has been sent,Please confirm in your wallet.',
                ),
              );
              return;
            } else {
              setLoading(false);
              message.error(switchError.message);
              return switchError.message;
            }
          }
        }

        const web3instance = new ethers.providers.Web3Provider(
          providerInstance,
        );
        const Account = await web3instance._getAddress(account); // ethers.utils.getAddress

        fn?.();
        // set
        setWeb3Provider(web3instance);
        setWalletProider(providerInstance);
        setLoading(false);

        setAccount(Account);
        setWalletType(wallet_type);
        setNetworkData(chainsInfo);

        return null;
      } catch (e: any) {
        setLoading(false);
        const messgae = t(catchMsg[e.message]) ?? e.message;
        message.error(messgae);
        return messgae;
      }
    } else {
      // 不支持的网络
      message.error(
        `chainId：${network_id}，${t(
          'Unsupported network, need to switch to supported network:',
        )}`,
      );
      connector(chainsList[0].chainId, walletType);
    }
  };

  const connect = (
    id = networkId,
    type = walletType,
    auto_connect?: boolean,
    fn?: () => void,
  ) => {
    if (id && type) {
      const network: any = chainsList.find(
        (element: any) => element.chainId === Number(id),
      )?.networkId;
      connector(network ?? chainsList[0].chainId, type, auto_connect, fn);
    }
  };

  const disconnect = async () => {
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setNetworkChainsInfo(undefined);
    setContracts(undefined);
    setWalletType('');
    // setLoading(false);
  };

  // 监听登录
  function handleAccountsChainChanged() {
    if (!WalletProider?.on) return;

    // 切换账户
    WalletProider?.on('accountsChanged', (_accounts: any) => {
      console.log(_accounts, '_accounts1');
      // if (!_accounts.length) return;
      if (account === _accounts[0]) return; // 当前账号

      // 有账号并且是正确的地址
      if (isAddress(_accounts[0]) && _accounts?.length) {
        setAccount(_accounts[0]);
      }
      if (_accounts?.length === 0 && account) {
        disconnect();
      }
      // setAccount(isAddress(_accounts[0]));
      console.log('切换账户');
      if (reload) window.location.reload();
    });

    // 切换链
    WalletProider?.on('chainChanged', (chainId: any) => {
      const chainIdValue = setProviderChainId(chainId);
      const network: chainsType | undefined = chainsList.find(
        (element: chainsType) => {
          return element.chainId === Number(chainIdValue);
        },
      );
      if (network) {
        setNetworkData(network);
      } else {
        setChainId(chainIdValue);
        setNetworkId(chainIdValue);
        setContracts(undefined);
        setNetworkChainsInfo(undefined);
        connector(chainIdValue, walletType);
      }
      console.log('切换链');
      if (reload) window.location.reload();
    });

    // WalletProider?.on('disconnect', () => {
    //   disconnect();
    // });
  }
  useEffect(() => {
    handleAccountsChainChanged();
  }, [WalletProider]);

  useEffect(() => {
    if (networkId && walletType) {
      connector(networkId, walletType, true);
    }
  }, []);

  return useMemo(() => {
    return {
      web3Provider,
      WalletProider,
      chainId,
      account,
      active: !!account && !!chainId,
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
    networkChainsInfo,
    contracts,
    loading,
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
  const baseEthereumClient = {
    ...ethereumClient,
    locale:
      ethereumClient?.locale && resources[ethereumClient?.locale]
        ? ethereumClient?.locale
        : BaseLocale,
  };
  return (
    <Storage.Provider initialState={baseEthereumClient}>
      <Web3Hook.Provider initialState={baseEthereumClient}>
        {children}
      </Web3Hook.Provider>
    </Storage.Provider>
  );
}

export default Web3Modal;
