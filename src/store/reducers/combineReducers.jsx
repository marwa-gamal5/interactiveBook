import {combineReducers} from "redux";
import dataReducer from "./dataReducer.jsx";

export default combineReducers({
    data : dataReducer ,
})