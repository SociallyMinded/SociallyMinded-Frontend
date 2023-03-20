import { ShopPage } from './components/Shop/ShopPage';
import Home from './components/Home/Home';
import { AuthContextProvider } from './context/AuthContext';
import Signup from './components/Signup/Signup.jsx';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ProductListing from './components/ProductListing/ProductListing';
import { ProductReviewPage } from './components/ProductReview/ProductReviewPage';
import { ProfilePage } from './components/Profile/ProfilePage';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/reset_pw' element={<ResetPassword/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/shop' element={<ShopPage/>}/>
            <Route path='/product_listing' element={<ProductListing/>}/>
            <Route path='/product_review' element={<ProductReviewPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
