import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import HistoryTicket from './pages/HistoryTicket';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Payment from './pages/Payment';

import useAuthenticateUser from './hooks/useAuthenticateUser';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  const { dataUser , jwtToken , setListenLogin } = useAuthenticateUser()
  return (
    <Router basename=''>
      <ToastContainer />
      <div className="App pt-[70px]">
      
        <Navbar dataUser={dataUser} jwtToken={jwtToken} setListenLogin={setListenLogin} /> 
        <Routes>
          <Route path={`/product/detail/:id`} Component={ProductDetail} />
          <Route path={`/checkout`} element={<Checkout setListenLogin={setListenLogin} dataUser={dataUser} jwtToken={jwtToken}/>} />
          <Route path={`/myticket`} element={<HistoryTicket dataUser={dataUser}/>} />
          <Route path={`/login`} element={<Login setListenLogin={setListenLogin}/>}/>
          <Route path={`/register`} Component={Register}/>
          <Route path={`/payment`} element={<Payment dataUser={dataUser}/>}/>
          <Route path={`/verify_email/:id`} element={<VerifyEmail setListenLogin={setListenLogin}/>}/>
          <Route exact path="/" Component={Home}  />
        </Routes>
        
      </div>
      <Footer />
    </Router>
  )
}

export default App
