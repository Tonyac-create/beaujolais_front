import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/HomePage/Home'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/home' element={<Home />} />

      </Routes>
    </>
  )
}

export default App
