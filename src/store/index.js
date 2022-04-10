import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

const reducer = combineReducers({
	app: reducers.app,
	storage: reducers.storage,
});

const store = createStore(reducer);

export default store;
