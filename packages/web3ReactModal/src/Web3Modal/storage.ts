import { localStorage } from '@infte/utils';
import { useMemo, useReducer } from 'react';
import { createContainer } from 'unstated-next';
import config, { type WalletType } from '../config';
import resources from '../locales';
import { localeKeys } from '../locales/index';

const WALLET_STORAGE = 'WALLET_STORAGE'; // useStorage-KEY

export const NETWORK_ID_NAME: any = 'network_id'; // 默认链
export const WALLET_TYPE_NAME: any = 'wallet_type'; // 指定钱包类型，默认链接。不指定需要手动选择

export type storageInitialStates = {
  network_id?: number | string | null; // 默认链
  wallet_type?: WalletType; // 指定钱包类型，默认链接。不指定需要手动选择
  locale?: localeKeys; // 语言
};

interface StorageType {
  network_id: number;
  wallet_type: WalletType;
  setNetworkId: (t: number) => any;
  setWalletType: (s: WalletType) => any;
  t: (str: string) => string;
}

function reducer(state: any, action: any) {
  const data = {
    ...state,
    [action.type]: action.data,
  };
  localStorage(WALLET_STORAGE, JSON.stringify(data));
  return { ...data };
}

function useStorage(customInitialStates?: storageInitialStates): StorageType {
  const data = JSON.parse(localStorage(WALLET_STORAGE) ?? '{}');

  const initStates: storageInitialStates = {
    ...customInitialStates,
    [NETWORK_ID_NAME]:
      data?.[NETWORK_ID_NAME] ??
      customInitialStates?.network_id ??
      config.chainsList[0].chainId,
    [WALLET_TYPE_NAME]:
      data?.[WALLET_TYPE_NAME] ?? customInitialStates?.wallet_type,
  };

  const [state, dispatch] = useReducer(reducer, initStates);
  const { locale = config.BaseLocale } = initStates;

  const t = (str: string) => {
    return resources[locale][str];
  };

  return useMemo(() => {
    return {
      ...state,
      setNetworkId: (payload: number) => {
        dispatch({ type: NETWORK_ID_NAME, data: payload });
      },
      setWalletType: (payload: WalletType) => {
        dispatch({ type: WALLET_TYPE_NAME, data: payload });
      },
      t,
    };
  }, [state, t]);
}

const useStorages = createContainer(useStorage);
export const useWeb3Storage = useStorages.useContainer;

export default useStorages;
