import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Pages/Main";
import ProductPage from "./Pages/ProductPage";
import ProDetails from "./Pages/ProDetails";
import AddProduct from "./Pages/AddProduct";
import Contact from "./Pages/Contact";
import AdminPanel from "./Pages/AdminPanel";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Edit from "./Pages/Edit";
function App() {
  return (
    <>
      <div className="app">
        <SpeedInsights />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProDetails />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/qqwweerrttyy" element={<AdminPanel />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
          {/* <Color /> */}
          {/* <Colorshow /> */}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
