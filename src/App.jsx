import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pago from "./components/PrePago/Pago";
import Init from "./components/Init/Init";
import Postpago from "./components/Postpago/Postpago";


function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pago />} />
        <Route path="/trb" element={<Init />} />
        <Route path="/postpago" element={<Postpago />} />


      </Routes>
    </BrowserRouter>
  
  </>;
}

export default App;
