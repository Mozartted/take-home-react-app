import React from 'react';
// import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'react-phone-input-2/lib/bootstrap.css'
import reportWebVitals from './reportWebVitals';
import { ToastProvider, useToasts } from 'react-toast-notifications'




const Index = () => (<ToastProvider><App/></ToastProvider>)

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
