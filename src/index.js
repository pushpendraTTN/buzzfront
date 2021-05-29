import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userReducer from './store/reducer/userReducer';
import viewUserReducer from './store/reducer/postReducer';


const composeEnhancers = 
(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
    user:userReducer,
    viewuser:viewUserReducer
  });

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));


// const store = createStore(userReducer);

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
