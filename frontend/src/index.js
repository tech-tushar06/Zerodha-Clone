import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';  
import PricingPage from './landing_page/pricing/PricingPage';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/product/ProductPage';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from "./landing_page/NotFound";
import Navbar from './Navbar';
import Footer from "./Footer";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/about' element={<AboutPage/>}></Route>
    <Route path='/product' element={<ProductPage/>}></Route>
    <Route path='/pricing' element={<PricingPage/>}></Route>
    <Route path='/support' element={<SupportPage/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
  <Footer/>
  </BrowserRouter>
 
);
export default reportWebVitals();


