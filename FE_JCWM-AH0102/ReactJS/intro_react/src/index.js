import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
// Contoh penggunaan functional component
// const Func = () => {
//   return (
//     <div>
//       <h1>Halo bos</h1>
//     </div>
//   )
// }
// contoh render element degan reactDOM
// ReactDOM.render(<Func />, document.getElementById('master'));
ReactDOM.render(
    // Sebagai penghubung semua page yang telah di <Route> di App.js
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
