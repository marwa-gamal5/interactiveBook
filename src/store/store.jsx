import reducer from "./reducers/combineReducers.jsx";
import {applyMiddleware , createStore }from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk  from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


const store = createStore(reducer , composeWithDevTools(applyMiddleware(thunk)));

export default store;