import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import{Signin} from './pages/Signin'
import{Signup} from './pages/Signup'
import { Dashboard } from './pages/Dashboard'



import './App.css'

function App() {
  

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
