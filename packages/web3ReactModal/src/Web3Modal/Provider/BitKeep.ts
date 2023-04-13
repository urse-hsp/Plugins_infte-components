export function getProvider() {
  const provider = window?.bitkeep && window?.bitkeep.ethereum;
  if (!provider) {
    window.open('https://bitkeep.com/en/download?type=2');
    throw 'Please go to our official website to download!!';
  }
  return provider;
}
