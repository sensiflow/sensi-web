import * as React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/auth/login";
import { Home } from "./pages/home";
import Register from "./pages/auth/register";



export  function App() {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
      </Routes>  
    </BrowserRouter>
  );
}
