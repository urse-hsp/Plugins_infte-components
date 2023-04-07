import { localStorage } from '@infte/utils';
import { useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { type WalletType } from '.';
import config from './config';

export type dataType<T> = Record<string, T>;

const NETWORK_ID_NAME = 'NETWORK_ID';
const WALLET_TYPE_NAME = 'WALLET_TYPE';

const defaultStates: dataType<any> = {
  NETWORK_ID: localStorage(NETWORK_ID_NAME) ?? config.BASE_NETWORK_ID,
  WALLET_TYPE: localStorage(WALLET_TYPE_NAME) ?? config.BASE_WALLET_TYPE,
};

interface StorageType {
  networkId: number;
  walletType: WalletType;
  setNetworkId: (t: number) => any;
  setWalletType: (s: WalletType) => any;
}

function useStorage(customInitialStates = {}): StorageType {
  const initStates = Object.assign({}, defaultStates, customInitialStates);
  const [networkId, setNetworkId] = useState<number>(initStates.NETWORK_ID);
  const [walletType, setWalletType] = useState<WalletType>(
    initStates.WALLET_TYPE,
  );

  return {
    networkId,
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
