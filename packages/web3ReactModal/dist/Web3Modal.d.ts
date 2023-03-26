import { ReactNode } from 'react';
import { type chainsType, type contractsType } from './config';
export declare type WalletType = string;
interface web3HookType {
    web3Provider: any;
    WalletProider: any;
    chainId: number | undefined;
    account: string;
    active: boolean;
    loading: boolean;
    connect: (network_id: number, wallet_type: WalletType, auto_connect?: boolean) => any;
    disconnect: () => any;
    networkChainsInfo: chainsType | undefined;
    contracts: contractsType | undefined;
}
export declare const useWeb3Provider: () => web3HookType;
declare type Web3ModalType = {
    children: ReactNode;
};
export declare function Web3Modal({ children }: Web3ModalType): JSX.Element;
export default Web3Modal;
//# sourceMappingURL=Web3Modal.d.ts.map