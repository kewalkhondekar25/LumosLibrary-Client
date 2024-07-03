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
import Profile from './components/Profile'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <Router>
      <Header/>
      <Toaster/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<ProtectedRoute element={Shop} />} />
        <Route path='/book/:id' element={<ProtectedRoute element={SelectedBook} />} />
        <Route path='/cart' element={<ProtectedRoute element={Cart} />} />
        <Route path='/checkout' element={<ProtectedRoute element={Checkout} />} />
        <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
        {/* <Route path='/shop' element={<Shop/>}/>
        <Route path="/book/:id" element={<SelectedBook/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/profile' element={<Profile/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
