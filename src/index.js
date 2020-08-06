import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import App from './components/App';

const initialState = {
	user: {
		isLogin: false,
		newuser: {
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	},
};

const enhancers = [];
const middleware = thunk;

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(middleware),
  ...enhancers,
);

const store = createStore(rootReducer, initialState, composedEnhancers);
ReactDOM.render(
	<Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
	document.getElementById('root'),
);
