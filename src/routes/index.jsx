import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "../routes/home/Home"
import Auth from "../routes/auth/Auth"
import Login from "../routes/auth/login/Login"
import Register from "../routes/auth/register/Register"
import Favourite from "../routes/favourite/Favoutite"
import SinglePage from "../routes/single-page/SinglePage"
import NotFound from "../routes/not-found/NotFound"
import Cart from "../routes/cart/Cart"

const RouteController = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="single-page/:id" element={<SinglePage />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes> 
    </>
  )
}

export default RouteController