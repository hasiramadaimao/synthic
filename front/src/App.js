import React, { useState } from 'react'
import './App.css';
import ProtectedRoute from "react-protected-route-component"

import MainContext from './Context/MainContext'
import ItemContext from './Context/ItemContext';

import LoginPage from './Components/LoginPage'
import DashBoard from './Components/DashBoard'


function App() {

  const [logged, setLogged] = useState(false)
  const [item, setItem] = useState(null)

  let guardFun = () => {
    if (logged) {
      return true
    } else {
      return false
    }
  }

  let guardFunRev = () => {
    if (!logged) {
      return true
    } else {
      return false
    }
  }

  return (
    <MainContext.Provider value={{ logged, setLogged }}>
      <ItemContext.Provider value={{ item, setItem }}>
        <div className="App">
          <ProtectedRoute path="/" component={LoginPage} guardFunction={guardFunRev} />
          <ProtectedRoute path="/" component={DashBoard} guardFunction={guardFun} />
        </div>
      </ItemContext.Provider>
    </MainContext.Provider>
  );
}

export default App;
