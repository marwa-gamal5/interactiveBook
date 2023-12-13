import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import axiosInstance from "./network/axiosinstance.js";
import Flipbook from '../src/Flipbook/Flipbook';
import {Provider, useDispatch, useSelector} from "react-redux";
import {getData} from "./store/actions/dataAction.jsx";
import store from "./store/store.jsx";

function App() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data.data);

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]); // You can add dependencies here if needed

    useEffect(() => {
        console.log('data from app redux:', data);
    }, [data]);

    return (
    <>
     {/*<Provider store={store}>*/}
     <BrowserRouter>
      <Routes>
      <Route path = {"/"} element = {<Flipbook/>} />
      </Routes>
      </BrowserRouter>
     {/*</Provider>*/}
     
    </>
  )
}

export default App
