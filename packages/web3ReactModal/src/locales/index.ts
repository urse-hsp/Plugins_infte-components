import en_us from './en_US.json';
import zh_cn from './zh_CN.json';
import zh_hk from './zh_HK.json';

export type localeKeys = 'en_us' | 'zh_cn' | 'zh_hk' | string;

const resources: Record<localeKeys, any> = {
  en_us,
  zh_cn,
  zh_hk,
};
export default resources;
