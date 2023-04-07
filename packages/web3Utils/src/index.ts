import ethers from 'ethers';

// 判断地址是否正确
export function isAddress(value: any, isAddress = true): string {
  try {
    if (isAddress) {
      return ethers.utils.getAddress(value);
    } else {
      return ethers.utils.getContractAddress(value);
    }
  } catch {
    return '';
  }
}
