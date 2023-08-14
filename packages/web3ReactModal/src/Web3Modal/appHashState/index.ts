import { localStorage } from '@infte/utils';
import { useMemo, useReducer } from 'react';
import { createContainer } from 'unstated-next';

const USEAPPHASHSTATEDATAKEY = 'APPHASHSTATEDATAKEY'; // useAppHashStateData-KEY

const HASHADDRESSKEY = 'hashAddress'; // 上链完成后的交易哈希列表
const HASHLOADINGADDRESSKEY = 'hashLoadingAddress'; // 上链中的哈希列表
const CHANGEHASHADDRESS = 'changeHashAddress'; // hash变动

interface defaultStatesType {
  hashAddress: string[];
  setHashAddress: (address: string) => any;

  hashLoadingAddress: string[];
  setLoadingHashAddress: (address: string) => any;
  changeHashAddress: (address: string, remove?: boolean) => any;
}

function reducer(state: any, action: any) {
  const data = state;
  switch (action.type) {
    case HASHADDRESSKEY:
      data[HASHADDRESSKEY] = [...state?.[HASHADDRESSKEY], action.address];
      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };
    case HASHLOADINGADDRESSKEY:
      data[HASHLOADINGADDRESSKEY] = [
        ...state?.[HASHLOADINGADDRESSKEY],
        action.address,
      ];

      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };
    case CHANGEHASHADDRESS:
      // eslint-disable-next-line no-case-declarations
      const newloadingHash: any = state?.[HASHLOADINGADDRESSKEY].filter(
        (item: any) => item !== action.address,
      );
      data[HASHLOADINGADDRESSKEY] = newloadingHash;
      if (!action?.remove) {
        data[HASHADDRESSKEY] = [...state?.[HASHADDRESSKEY], action.address];
      }
      localStorage(USEAPPHASHSTATEDATAKEY, JSON.stringify(data));
      return { ...data };
    default:
      return state;
  }
}

function useAppHashStateData(): defaultStatesType {
  const data = JSON.parse(localStorage(USEAPPHASHSTATEDATAKEY) ?? '{}');
  const initialStates = {
    [HASHADDRESSKEY]: data?.[HASHADDRESSKEY] ?? [],
    [HASHLOADINGADDRESSKEY]: data?.[HASHLOADINGADDRESSKEY] ?? [],
  };
  const [state, dispatch] = useReducer(reducer, initialStates);

  return useMemo(() => {
    return {
      ...state,
      // 改变上链后的列表
      setHashAddress: (address: string) => {
        dispatch({ type: HASHADDRESSKEY, address });
      },
      setLoadingHashAddress: (address: string) => {
        dispatch({ type: HASHLOADINGADDRESSKEY, address });
      },
      // hash变动
      changeHashAddress: (address: string, remove = false) => {
        dispatch({ type: CHANGEHASHADDRESS, address, remove });
      },
    };
  }, [state]);
}

export const AppState = createContainer(useAppHashStateData);
export const useAppHashState = AppState.useContainer;

export default AppState;
