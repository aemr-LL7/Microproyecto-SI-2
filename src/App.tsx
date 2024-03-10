//import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { NotFound } from './Pages/NotFound/NotFound'
import { SignUp } from './Pages/SignUp/SignUp'
import { Login } from './Pages/Login/Login'
import { Home } from './Pages/Home/Home'

function App() {
  //const [count, setCount] = useState(0)
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path='/signin' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>

  )
}

export default App
