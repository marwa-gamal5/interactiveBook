import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Flipbook from '../src/Flipbook/Flipbook'
import Test from './pages/Page1/test';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path = {"/"} element = {<Flipbook/>} />
      </Routes>
      </BrowserRouter>
     
      </div>
    </>
  )
}

export default App
