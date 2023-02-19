import { Customer } from './components/Customer/Customer';
import Home from './components/Home/Home';
import { AuthContextProvider } from './context/AuthContext';
import Signup from './components/Signup/Signup.jsx';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';

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
            <Route path='/home' element={<Customer/>}/>
        </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
