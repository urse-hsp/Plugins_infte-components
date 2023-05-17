import { localStorage } from '@infte/utils';
import { useState } from 'react';
import { createContainer } from 'unstated-next';
import config, { type WalletType } from '../config';
import resources from '../locales';
import { localeKeys } from '../locales/index';
const NETWORK_ID_NAME = 'NETWORK_ID';
const WALLET_TYPE_NAME = 'WALLET_TYPE';

export type storageInitialStates = {
  network_id?: number | string | null; // 默认链
  wallet_type?: WalletType; // 指定钱包类型，默认链接。不指定需要手动选择
  locale?: localeKeys; // 语言
};

interface StorageType {
  networkId: number;
  walletType: WalletType;
  setNetworkId: (t: number) => any;
  setWalletType: (s: WalletType) => any;
  t: (str: string) => string;
}

function useStorage(customInitialStates?: storageInitialStates): StorageType {
  const initStates: storageInitialStates = {
    ...customInitialStates,
    network_id:
      localStorage(NETWORK_ID_NAME) ??
      customInitialStates?.network_id ??
      config.chainsList[0].chainId,
    wallet_type:
      localStorage(WALLET_TYPE_NAME) ?? customInitialStates?.wallet_type,
    //  ?? config.BaseWalletType,
  };

  const { locale = config.BaseLocale } = initStates;

  const [networkId, setNetworkId] = useState<
    storageInitialStates['network_id']
  >(initStates.network_id ?? null);

  const [walletType, setWalletType] = useState<WalletType>(
    initStates?.wallet_type ?? '',
  );

  const t = (str: string) => {
    return resources[locale][str];
  };

  return {
    networkId: Number(networkId),
    walletType,
    setNetworkId: (payload: number) => {
      localStorage(NETWORK_ID_NAME, payload);
      setNetworkId(payload);
    },
    setWalletType: (payload: WalletType) => {
      localStorage(WALLET_TYPE_NAME, payload);
      setWalletType(payload);
    },
    t,
  };
}

const useStorages = createContainer(useStorage);

export const useWeb3Storage = (): StorageType => {
  const data = useStorages.useContainer();
  return data;
};

export default useStorages;
