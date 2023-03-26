export interface contractsType {
    social: string;
}
export interface chainsType {
    name: string;
    chainId: number;
    networkId: number;
    contracts: contractsType;
}
interface BaseDataType {
    BaseLocale: string;
    BASE_NETWORK_ID: number;
    BASE_WALLET_TYPE: string;
    CHAIN_ID: number;
    chainsList: chainsType[];
}
declare const config: BaseDataType;
export default config;
//# sourceMappingURL=config.d.ts.map