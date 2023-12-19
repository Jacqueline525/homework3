import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BackGround from './BackGround';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const myReducer = (state, action) => {
	if (action.type === "setUsername") {
		return {username: action.payload}
	}
	else {
		return state;
	}
}

const store = createStore(myReducer, {username: 'User'})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BackGround />
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
