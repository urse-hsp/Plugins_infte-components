import { NFTStorage } from 'nft.storage';
export const NFT_STORAGE_APIKEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlM0E5YmZCRmViMjc4MDhDQTk3Zjc5Y0NBOTk1MUYxNzg1NDhCMkEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTQ1NDEwOTc1MCwibmFtZSI6Im5lc3QifQ.yGd0GduPqLnvYhh5xWa7zxRcinLT8OqYYoq-d4qPSF8';

export const uploadNFTContent = async (
  inputFile: File,
  key = NFT_STORAGE_APIKEY,
) => {
  const nftStorage = new NFTStorage({
    token: key,
  });
  try {
    //   setTxStatus('Uploading NFT to IPFS & Filecoin via NFT.storage.')
    const metaData = await nftStorage.store({
      name: 'Harmony NFT collection',
      description:
        'This is a Harmony NFT collenction stored on IPFS & Filecoin.',
      image: inputFile,
    });
    //   setMetaDataURl(getIPFSGatewayURL(metaData.url))
    return metaData;
  } catch (error) {
    //   setErrorMessage('Could not save NFT to NFT.Storage - Aborted minting.')
    console.log(error);
  }
};

export const getIPFSGatewayURL = (ipfsURL: string): string => {
  if (!ipfsURL) return '';
  const urlArray = ipfsURL?.split('/');
  const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
  return ipfsGateWayURL;
};
