import { isAddress } from '@infte/web3-utils';
import { message } from 'antd';
import { ethers } from 'ethers';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import config, { WalletList, WalletType, type chainsType } from '../config';
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

export interface web3HookType {
  web3Provider: any; // Web3Provider
  WalletProider: any; // Provider 链实例
  chainId: number | undefined; // chainId
  account: string; // 账户ox
  active: boolean; // 是否链接
  loading: boolean; // loading
  connect: (
    network_id?: number,
    wallet_type?: WalletType,
    fn?: () => void,
  ) => any;
  disconnect: () => any;
  networkChainsInfo: chainsType | undefined;
  contracts: any;
  notSupport: boolean; // true不支持网络 false支持
}

type initialState = {
  chainsList?: chainsType[]; // 支持的链
};

const BaseLocale = config.BaseLocale;
const BaseinitialState: initialState = {
  chainsList: config.chainsList,
};

const useWeb3Hook = (props?: initialState): web3HookType => {
  const initialData: initialState = Object.assign({}, BaseinitialState, props);
  const { chainsList = [] } = initialData;

  // Web3
  const [web3Provider, setWeb3Provider] = useState<any>(null);
  const [WalletProider, setWalletProider] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const [networkChainsInfo, setNetworkChainsInfo] = useState<
    chainsType | undefined
  >(undefined);
  const [contracts, setContracts] = useState<any>(undefined);

  const { wallet_type, network_id, setNetworkId, setWalletType, t } =
    useWeb3Storage();

  const [notSupport, setNotSupport] = useState(false); // 不支持的

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
  // 限制支持链
  const getChainsInfo = (chainId_: number): chainsType | undefined => {
    return chainsList.find((item: chainsType) => item?.networkId === chainId_);
  };

  const connector = async (
    CHAINS_ID: number = network_id,
    WALLET_TYPE: WalletType = wallet_type,
    fn?: () => void,
  ) => {
    if (loading) {
      return;
    }
    if (!WALLET_TYPE) {
      message.error({
        content: 'Please select the wallet',
        key: 'Please select the wallet',
      });
      return;
    }

    const network_chainsId: number = Number(CHAINS_ID);
    // 当前链当前钱包不做操作
    if (network_chainsId === chainId && WALLET_TYPE === wallet_type) {
      setChainId(network_chainsId); // 其他链当前显示的chainid不一样，切换成当前连接
      setNotSupport(false); // 是支持的链
      return;
    }

    setLoading(true);

    // 获取当前要进行链接的chainid 是否是支持的网络
    const chainsInfo = getChainsInfo(network_chainsId);

    // 支持的网络
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
          // 未下载metamask
          const msg = `${t('Please install')} ${WALLET_TYPE} !`;
          message.error({
            content: msg,
            key: msg,
          });
          setLoading(false);
          return;
        }

        // 获取当前在线网络
        const walletChainId = await providerInstance.request({
          method: 'eth_chainId',
        });
        const providerChainId: number = setProviderChainId(walletChainId);

        // 更改为当前要链接的网络
        if (network_chainsId !== providerChainId) {
          // 获取当前钱包已经链接的chainid是否是支持的网络 不是支持网络改变NotSupport参数
          const currentChain = getChainsInfo(providerChainId);
          if (!currentChain) {
            setNotSupport(true);
          }

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
                message.error({
                  content: addError.message,
                  key: addError.message,
                });
                setLoading(false);
                return addError.message;
              }
            } else if (switchError.code === 4001) {
              const msg = t('You denied the Switch network request');
              message.error({
                content: msg,
                key: msg,
              });
              setLoading(false);
              return;
            } else if (switchError.code === -32002) {
              const msg_destroy: string =
                t(
                  'A Switch Network request has been sent,Please confirm in your wallet.',
                ) ?? '';
              message.destroy(msg_destroy);
              return;
            } else {
              setLoading(false);
              message.error({
                content: switchError.message,
                key: switchError.message,
              });
              return;
            }
          }
        }

        const web3instance = new ethers.providers.Web3Provider(
          providerInstance,
        );
        const Account = await web3instance._getAddress(account); // ethers.utils.getAddress

        // set
        setWeb3Provider(web3instance); // web3实例
        setWalletProider(providerInstance); // window钱包实例Proider
        setLoading(false);

        setAccount(Account); // 账户
        setWalletType(WALLET_TYPE); // 钱包类型
        setNetworkData(chainsInfo); // 网络数据
        setNotSupport(false); // 不支持的网络
        fn?.();
        return null;
      } catch (e: any) {
        setLoading(false);
        const messgae = t(catchMsg[e.message]) ?? e.message;
        message.error({
          content: messgae,
          key: messgae,
        });
        return messgae;
      }
    } else {
      // 不支持的网络时
      const content = `chainId：${network_chainsId}，${t(
        'Unsupported network, need to switch to supported network:',
      )}`;
      message.error({
        content,
        key: content,
      });

      setLoading(false);
      setChainId(network_chainsId);
      setNotSupport(true);

      // connector(chainsList[0].chainId, WALLET_TYPE);
    }
  };

  const disconnect = async () => {
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setChainId(undefined);
    setNetworkChainsInfo(undefined);
    setContracts(undefined);

    setWalletType(''); // 删除连接的钱包
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
    });

    // 切换链
    WalletProider?.on('chainChanged', (chainId: any) => {
      // 切换的chainid
      const chainIdValue = setProviderChainId(chainId);
      connector(chainIdValue, wallet_type);
    });

    // WalletProider?.on('disconnect', () => {
    //   disconnect();
    // });
  }
  useEffect(() => {
    handleAccountsChainChanged();
  }, [WalletProider, chainId, account, disconnect]);

  // 链接钱包
  const connect_wallet = network_id && wallet_type;

  useEffect(() => {
    // 刷新链接钱包 有链接记录 自动链接钱包
    if (connect_wallet) {
      connector(network_id, wallet_type);
    }
  }, []);

  return useMemo(() => {
    return {
      web3Provider,
      WalletProider,
      chainId,
      account,
      active: !!account && !!chainId,
      connect: connector,
      disconnect,
      networkChainsInfo,
      contracts,
      loading,
      notSupport,
    };
  }, [
    web3Provider,
    WalletProider,
    chainId,
    account,
    networkChainsInfo,
    contracts,
    loading,
    notSupport,
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
