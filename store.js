import { applyMiddleware, createStore } from 'redux';
import allReducers from './slices/navSlice';
import thunk from 'redux-thunk';
const store = createStore(allReducers, {}, applyMiddleware(thunk));

export default store;

