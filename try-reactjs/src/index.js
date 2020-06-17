import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Alert } from 'reactstrap'

const Func = (props) => {
  return (
    <div>
      <Alert color="danger">
        This is a light alert — check it out!
      </Alert>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Func />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
