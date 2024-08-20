import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Signup from "./Component/Signup";
import Signin from "./Component/Signin";
import Dashboard from "./Component/Dashboard";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      // <Dashboard/>

   
  );
}

export default App;
