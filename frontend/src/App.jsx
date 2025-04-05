import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp></SignUp>} ></Route>
          <Route path = '/login' element = {<Login></Login>}></Route>
        </Routes>
      </Router>
      </>
  )
}

export default App
