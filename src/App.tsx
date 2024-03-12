//import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { NotFound } from './Pages/NotFound/NotFound'
import { SignUp } from './Pages/SignUp/SignUp'
import { Login } from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/profile'
import Editprofile  from './Pages/Profile/editProfile'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='/signin' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='*' element={<NotFound />} /> {/* Página de error para rutas no definidas */}
    <Route path='/' element={<Navigate to="/home" />} /> {/* Redirige automáticamente a /home */}
    <Route path='/editprofile' element={<Editprofile />} />
  </Routes>

  )
}

export default App
