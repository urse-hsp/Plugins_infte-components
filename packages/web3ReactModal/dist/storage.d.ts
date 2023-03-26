import { type WalletType } from './Web3Modal';
interface StorageType {
    networkId: number;
    walletType: WalletType;
    setNetworkId: (t: number) => any;
    setWalletType: (s: WalletType) => any;
}
declare const useStorages: import("unstated-next").Container<StorageType, {}>;
export declare const useWeb3Storage: () => StorageType;
export default useStorages;
//# sourceMappingURL=storage.d.ts.map