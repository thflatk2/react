import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);

/*
const rootElement = document.getElementById('root');    
ReactDOM.render(<App headerTitle = "Welcome!"
                     contentTitle = "Stranger,"
                     contentBody = "Welcome to example app"/>, rootElement);

 App의 headerTitle, contentTitle, contentBody 부분을 여기서 추가할 수 도 있다.
 */

