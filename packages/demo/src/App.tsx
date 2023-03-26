import { getName } from '@infte/utils';
import { useWeb3Provider } from '@infte/web3-react';
import './App.css';

function App() {
  const { connect } = useWeb3Provider();
  console.log(getName('hsp'), 'getName');

  return (
    <div className="App">
      <button onClick={() => connect?.(65, 'MetaMask')}>链接</button>
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
