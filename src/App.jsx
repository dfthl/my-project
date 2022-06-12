import React from "react";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/auth/login";
import CatalogById from "./pages/catalog/id";
import Catalog from "./pages/catalog/index";
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";

const NotFound = () => {
  return (
    <>
    <p>Not Found</p>
    <br />
    return to  <a href="/">HomePage?</a>
    </>
  )
}
const RequiredAuth = () => {
  let isAuth = localStorage.getItem('access_token')

  if (!isAuth) {
    return <Navigate to="/"/>
  }
  // outlet is children of private route
  return <Outlet/>
}

export default function App() {

  return(
    <>
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LoginPage/>} />
        <Route path="/catalog" >
          <Route path=":id" element={<CatalogById/>} />
          <Route index element={<Catalog/>}/>
        </Route>


        
        {/* protected routes pages */}
        <Route element={<RequiredAuth/>}>
          {/* list of requiredAuth Outlet */}
          <Route index path="/dashboard" element={<Dashboard/>}/>
          {/* example another route
          <Route index path="/profile" element={ <Profile/>}/>
          */}
        </Route>
        {/* not found page */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}