import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';

function AppRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }