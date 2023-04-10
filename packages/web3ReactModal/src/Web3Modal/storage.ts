import { localStorage } from '@infte/utils';
import { useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { type WalletType } from '.';
import config from './config';

export type dataType<T> = Record<string, T>;

const NETWORK_ID_NAME = 'NETWORK_ID';
const WALLET_TYPE_NAME = 'WALLET_TYPE';

export type storageInitialStates = {
  network_id?: number | string | null; // 默认链
  wallet_type?: string; // 钱包类型
};

interface StorageType {
  networkId: number;
  walletType: WalletType;
  setNetworkId: (t: number) => any;
  setWalletType: (s: WalletType) => any;
}

function useStorage(customInitialStates?: storageInitialStates): StorageType {
  const initStates: storageInitialStates = {
    ...customInitialStates,
    network_id:
      localStorage(NETWORK_ID_NAME) ??
      customInitialStates?.network_id ??
      config.chainsList[0].chainId,
    wallet_type:
      localStorage(WALLET_TYPE_NAME) ??
      customInitialStates?.wallet_type ??
      'MetaMask',
  };

  const [networkId, setNetworkId] = useState<
    storageInitialStates['network_id']
  >(initStates.network_id ?? null);

  const [walletType, setWalletType] = useState<string>(
    initStates?.wallet_type ?? 'MetaMask',
  );

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
  };
}

const useStorages = createContainer(useStorage);

export const useWeb3Storage = (): StorageType => {
  const data = useStorages.useContainer();
  return useMemo(() => {
    return data;
  }, [data]);
};

export default useStorages;
