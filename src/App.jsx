import React from "react";
import { BrowserRouter, Routes, Route } from "react-router"
import Splash from "./pages/Splash";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
