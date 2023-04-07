import { useWeb3Provider } from '@infte/web3modal-react';

import './App.css';

function App() {
  const { connect, account, disconnect } = useWeb3Provider();
  // console.log(getName('hsp'), 'getName');

  return (
    <div className="App">
      <button
        onClick={() => {
          connect?.(65, 'MetaMask');
        }}
      >
        链接
      </button>
      <button onClick={disconnect}>退出</button>
      {account}
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
