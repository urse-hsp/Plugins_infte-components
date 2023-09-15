import {
  useAppHashState,
  useSingleResult,
  useWeb3Provider,
  Web3Button,
} from '@infte/web3modal-react';
import { useEffect } from 'react';
// import {
//   useWallet,
// } from '@suiet/wallet-kit'
import './App.css';

function App() {
  const { connect, account, disconnect, chainId, loading }: any =
    useWeb3Provider();

  const {
    hashAddress,
    hashLoadingAddress,
    setHashAddress,
    setLoadingHashAddress,
    changeHashAddress,
  } = useAppHashState();
  // console.log(hashAddress, 'hashAddress', hashLoadingAddress);

  useEffect(() => {
    // setHashAddress('0x573aa0650be86d1c8d254adf462d3077072649f885bd3bd39d97249ccb5650ca')

    setLoadingHashAddress(
      '0x573aa0650be86d1c8d254adf462d3077072649f885bd3bd39d97249ccb5650ca',
    );
    setTimeout(() => {
      changeHashAddress(
        '0x573aa0650be86d1c8d254adf462d3077072649f885bd3bd39d97249ccb5650ca',
      );
    }, 2000);
  }, [account]);

  const { web3Provider } = useWeb3Provider();
  const getBalance = useSingleResult(web3Provider ?? undefined, 'getBalance', [
    '0x77a0D5685Ed444b38e1e4f6198fe4D837F6c45F9',
  ]); // 用户的余额

  console.log(getBalance, 'getBalance123', web3Provider);

  return (
    <div className="App">
      <Web3Button
        pushWalletlist={[
          {
            label: '123',
            logo: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.XpnLCXvNjh1PjkvAr-t6nAAAAA?w=194&h=194&c=7&r=0&o=5&pid=1.7',
            key: '123',
            onClick: (done) => {
              console.log(123);
              done();
            },
            // loading:true
          },
        ]}
      />
      *****
      <Web3Button type="change" />
      {loading ? (
        'loading'
      ) : (
        <>
          <button
            onClick={() => {
              connect?.(12306);
            }}
          >
            12306
          </button>
          <button
            onClick={() => {
              connect?.(65);
            }}
          >
            65
          </button>
        </>
      )}
      <button onClick={disconnect}>退出1</button>
      {account} ***** {chainId}
      --------------
      {/* <div onClick={getSigner}>签名</div> */}
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
