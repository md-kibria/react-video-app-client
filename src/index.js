import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'
import {Provider} from 'react-redux'
import jwtDecode from 'jwt-decode';
import {AUTH_USER} from './store/types'
console.log('হ্যালো বন্ধু!')

const token = localStorage.getItem('auth_token')
if(token) {
  const user = jwtDecode(token)
  store.dispatch({
    type: AUTH_USER,
    payload: {
      user
    }
  })
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  