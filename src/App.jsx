import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Shop from './components/Shop'
import SelectedBook from './components/SelectedBook'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/book/:id" element={<SelectedBook/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </Router>
  )
}

export default App
