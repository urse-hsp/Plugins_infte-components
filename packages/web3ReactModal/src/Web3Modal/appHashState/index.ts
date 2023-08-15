import { localStorage } from '@infte/utils';
import { useMemo, useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { useWeb3Provider } from '../index';
const USEAPPHASHSTATEDATAKEY = 'APPHASHSTATEDATAKEY'; // useAppHashStateData-KEY

const HASHADDRESSKEY = 'hashAddress'; // 上链完成后的交易哈希列表
const HASHLOADINGADDRESSKEY = 'hashLoadingAddress'; // 上链中的哈希列表

const CHANGEHASHADDRESS = 'CHANGEHASHADDRESS'; // hash变动

interface defaultStatesType {
  hashAddress: string;
  setHashAddress: (address: string) => any;

  hashLoadingAddress: string;
  setLoadingHashAddress: (address: string) => any;
  changeHashAddress: (address: string, remove?: boolean) => any;
}

function reducer(state: any, action: any) {
  const account: string = action.account; //用户address

  if (!account) return;
  const data = state;
  const hashAddress_list = data?.[HASHADDRESSKEY][account] ?? [];
  const hashLoadingAddress_list = data?.[HASHLOADINGADDRESSKEY][account] ?? [];

  switch (action.type) {
    case HASHADDRESSKEY:
      if (!hashAddress_list.includes(action.address)) {
        data[HASHADDRESSKEY][account] = [...hashAddress_list, action.address];
      }
      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };

    case HASHLOADINGADDRESSKEY:
      if (!hashLoadingAddress_list.includes(action.address)) {
        data[HASHLOADINGADDRESSKEY][account] = [
          ...hashLoadingAddress_list,
          action.address,
        ];
      }

      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };
    case CHANGEHASHADDRESS:
      data[HASHLOADINGADDRESSKEY][account] = hashLoadingAddress_list?.filter(
        (item: any) => item !== action.address,
      );

      // false时间操作加入完成列表/true时间操作移除
      if (!action?.remove && !hashAddress_list.includes(action.address)) {
        data[HASHADDRESSKEY][account] = [...hashAddress_list, action.address];
      }

      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };

    default:
      return state;
  }
}

// function init(initialCount: any) {
//   const data = JSON.parse(localStorage(USEAPPHASHSTATEDATAKEY) ?? '{}');
//   return { ...initialCount, ...data };
// }

function useAppHashStateData(init: any): defaultStatesType {
  const { openStorage = true } = init;
  const { account, active } = useWeb3Provider();
  const data = JSON.parse(localStorage(USEAPPHASHSTATEDATAKEY) ?? '{}');
  const initialStates = {
    [HASHADDRESSKEY]: data?.[HASHADDRESSKEY] ?? {},
    [HASHLOADINGADDRESSKEY]: data?.[HASHLOADINGADDRESSKEY] ?? {},
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  console.log(state, 'state');

  const setState = (data: any) => {
    if (!openStorage) {
      return console.error('hash未开启本地存储');
    }
    if (active && account) {
      dispatch({ ...data, account });
    } else {
      console.error('未登录');
    }
  };

  return useMemo(() => {
    return {
      [HASHADDRESSKEY]: state?.[HASHADDRESSKEY]?.[account] ?? [],
      [HASHLOADINGADDRESSKEY]: state?.[HASHLOADINGADDRESSKEY]?.[account] ?? [],
      // 改变上链后的列表
      setHashAddress: (address: string) => {
        setState({ type: HASHADDRESSKEY, address });
      },
      setLoadingHashAddress: (address: string) => {
        setState({ type: HASHLOADINGADDRESSKEY, address });
      },
      // hash变动
      changeHashAddress: (address: string, remove = false) => {
        setState({ type: CHANGEHASHADDRESS, address, remove });
      },
    };
  }, [state, account]);
}

export const AppState = createContainer(useAppHashStateData);
export const useAppHashState = AppState.useContainer;

export default AppState;
