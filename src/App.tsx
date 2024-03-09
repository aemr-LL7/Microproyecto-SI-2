//import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home/Home'
import { SignUp } from './Pages/SignUp/SignUp'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/signin' element={<SignUp />} />
      {/* <Route path='*' element={<NotFound/>} /> */}
      <Route path='/' element={<Home/>} />
    </Routes>

  )
}

export default App
