import en_us from './en-US.json';
import zh_cn from './zh-CN.json';
import zh_hk from './zh-HK.json';

export type localeKeys = 'en-us' | 'zh-cn' | 'zh-hk' | string;

const resources: Record<localeKeys, any> = {
  'en-us': en_us,
  'zh-cn': zh_cn,
  'zh-hk': zh_hk,
};
export default resources;
