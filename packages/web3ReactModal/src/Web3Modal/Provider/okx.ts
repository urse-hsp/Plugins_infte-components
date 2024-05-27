export function getProvider() {
  const provider = (window as any)?.okxwallet;

  if (!provider) {
    window.open('https://www.okx.com/zh-hans/web3');
    throw 'OKX is installed!';
  }
  return provider;
}
