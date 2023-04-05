import { ShopPage } from './components/Shop/ShopPage';
import { AuthContextProvider } from './context/AuthContext';
import Signup from './components/Signup/Signup.jsx';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ProductListing from './components/ProductListing/ProductListing';
import { ProductReviewPage } from './components/ProductReview/ProductReviewPage';
import { AddProductReviewPage } from './components/AddProductReview/AddProductReviewPage';
import { ProfilePage } from './components/Profile/ProfilePage';
import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import Home from "./components/Home/Home.jsx"
export const LogoutToastContext = createContext(-1);

function App() {
  const [showLogoutToast, setShowLogoutToast] = useState(true);

  return (
    <div>
      <AuthContextProvider>

        <LogoutToastContext.Provider value={{ showLogoutToast, setShowLogoutToast }}>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/reset_pw' element={<ResetPassword/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/shop' element={<ShopPage/>}/>
              <Route path='/product_listing/:productId' element={<ProductListing/>}/>
              <Route path='/product_review' element={<ProductReviewPage/>}/>
              <Route path='/addReview' element={<AddProductReviewPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
          </Routes>
          </BrowserRouter>
        </LogoutToastContext.Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
