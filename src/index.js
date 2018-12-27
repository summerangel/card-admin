import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'moment/src/locale/zh-cn';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
