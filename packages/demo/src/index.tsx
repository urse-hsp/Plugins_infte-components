import { Web3Modal } from '@infte/web3modal-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import list from './network.chains_support.json';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <Web3Modal
    ethereumClient={{
      locale: 'zh-cn',
      // network_id: 12306,
      chainsList: list,
      // wallet_type: 'MetaMask',
      autoConnect: true,
    }}
  >
    <App />,
  </Web3Modal>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
