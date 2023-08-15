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
import AppHashState from './appHashState';
import Storage, { storageInitialStates, useWeb3Storage } from './storage';

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
};

const BaseLocale = config.BaseLocale;
const BaseinitialState: initialState = {
  chainsList: config.chainsList,
  reload: false,
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

  const { wallet_type, network_id, setNetworkId, setWalletType, t } =
    useWeb3Storage();

  // 根据进制数据转换阿拉伯数字
  const setProviderChainId = (chain_id: string) => {
    return Number(
      chain_id?.toString().indexOf('0x') === 0
        ? parseInt(chain_id, 16)
        : chainId,
    );
  };

  const setNetworkData = (data: chainsType) => {
    setChainId(data.chainId);
    setNetworkId(data.networkId);
    setContracts(data.contracts);
    setNetworkChainsInfo(data);
  };

  const connector = async (
    CHAINS_ID: number,
    WALLET_TYPE: WalletType,
    auto_connect?: boolean,
    fn?: () => void,
  ) => {
    if (loading) {
      return;
    }
    const network_chainsId: number = Number(CHAINS_ID);
    // 当前链当前钱包不做操作
    if (network_chainsId === chainId && WALLET_TYPE === wallet_type) {
      return;
    }
    setLoading(true);
    // 限制支持链
    const chainsInfo: chainsType | undefined = chainsList.find(
      (item: chainsType) => {
        return item?.networkId === Number(network_chainsId);
      },
    );

    if (chainsInfo) {
      // 匹配对应钱包Provider
      try {
        let providerInstance: any = null; // 钱包实例 provider
        let account: any = []; // ox账户

        // WalletProider
        providerInstance = await WalletProiderData?.[WALLET_TYPE].provider(); // eth实例 window.ethereum

        // 解锁 MateMask
        if (providerInstance) {
          account = (
            await providerInstance.request({
              method: 'eth_requestAccounts',
            })
          )[0];
        } else {
          if (!auto_connect) {
            message.error(`${t('Please install')} ${WALLET_TYPE} !`);
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
        if (network_chainsId !== providerChainId) {
          const chainId_to16 = `0x${network_chainsId.toString(16)}`;
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
                message.error(addError.message);
                setLoading(false);
                return addError.message;
              }
            } else if (switchError.code === 4001) {
              message.error(t('You denied the Switch network request'));
              setLoading(false);
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
              return;
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
        setLoading(false);

        setAccount(Account);
        setWalletType(WALLET_TYPE);
        setNetworkData(chainsInfo);
        fn?.();
        return null;
      } catch (e: any) {
        setLoading(false);
        const messgae = t(catchMsg[e.message]) ?? e.message;
        message.error(messgae);
        return messgae;
      }
    } else {
      // 不支持的网络
      const content = `chainId：${network_chainsId}，${t(
        'Unsupported network, need to switch to supported network:',
      )}`;
      message.error({
        content,
        key: content,
      });
      connector(chainsList[0].chainId, WALLET_TYPE);
    }
  };

  const connect = (
    id = network_id,
    type = wallet_type,
    auto_connect?: boolean,
    fn?: () => void,
  ) => {
    connector(id, type, auto_connect, fn);
  };

  const disconnect = async () => {
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setChainId(undefined);
    setNetworkChainsInfo(undefined);
    setContracts(undefined);
    setWalletType('');
  };

  // 监听登录
  function handleAccountsChainChanged() {
    if (!WalletProider?.on) return;

    // 切换账户
    WalletProider?.on('accountsChanged', (_accounts: any) => {
      // 当前账号
      const accountsAddress = isAddress(_accounts[0]);
      // 切换
      if (accountsAddress && account) {
        setAccount(accountsAddress);
      }
      // 退出
      if (_accounts?.length === 0 && account) {
        disconnect();
      }
      if (reload) window.location.reload();
    });

    // 切换链
    WalletProider?.on('chainChanged', (chainId: any) => {
      // 切换的chainid
      const chainIdValue = setProviderChainId(chainId);
      connect(chainIdValue, wallet_type);
      if (reload) window.location.reload();
    });
    // WalletProider?.on('disconnect', () => {
    //   disconnect();
    // });
  }
  useEffect(() => {
    handleAccountsChainChanged();
  }, [WalletProider, chainId, account, disconnect]);

  useEffect(() => {
    if (network_id && wallet_type) {
      connect(network_id, wallet_type, true);
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

export const useWeb3Provider = Web3Hook.useContainer;

interface ethereumClient extends initialState, storageInitialStates {
  locale?: localeKeys; // 语言
}

interface Web3ModalType {
  children: ReactNode;
  ethereumClient: ethereumClient;
  openHashStorage?: boolean; // 开启hash本地缓存
}

export function Web3Modal(props: Web3ModalType) {
  const { children, ethereumClient, openHashStorage = true } = props;
  const baseEthereumClient = {
    ...ethereumClient,
    locale:
      ethereumClient?.locale && resources[ethereumClient?.locale]
        ? ethereumClient?.locale
        : BaseLocale,
  };

  const AppHashState_init = {
    openStorage: openHashStorage,
  };

  return (
    <Storage.Provider initialState={baseEthereumClient}>
      <Web3Hook.Provider initialState={baseEthereumClient}>
        <AppHashState.Provider initialState={AppHashState_init}>
          {children}
        </AppHashState.Provider>
      </Web3Hook.Provider>
    </Storage.Provider>
  );
}

export default Web3Modal;
