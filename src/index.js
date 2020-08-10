import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const redirectTo = path => (
  <Redirect push to={{ pathname: path }} />
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

export default redirectTo;
