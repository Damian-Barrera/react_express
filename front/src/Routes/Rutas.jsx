 import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/Home'
import Registro from '../components/Registro'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'



const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element= { <Home /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path= "/registro" element= { <Registro /> } />
      <Route path= "/login" element= { <Login /> } />
      <Route path="/dashboard" element= {< Dashboard />} />
      <Route path='*' element= { <Navigate to= "/home"/> } />
    </Routes>
  )
}

export default Rutas
