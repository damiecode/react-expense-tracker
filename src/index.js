import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
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

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
