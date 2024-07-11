import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import InforUser from "./pages/user/InforUser";
import ChangeProducts from "./pages/admin/ChangeProducts";
import Details from "./pages/admin/Details";
import Admin from "./pages/admin/Admin";
import CreatProducts from "./pages/admin/CreatProducts";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Shop from "./pages/admin/Shop";
import Home from "./pages/admin/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InforUser></InforUser>}></Route>
        <Route path="/changeProducts" element={<ChangeProducts />}></Route>
        <Route path="/home/detail" element={<Details></Details>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/creatProducts" element={<CreatProducts />}></Route>
        <Route path="/admin/shop" element={<Shop />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Outlet />
    </div>
  );
}
