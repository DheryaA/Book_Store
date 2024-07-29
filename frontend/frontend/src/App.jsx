
import Home from "./pages/Home";
import Navbar from "./components/navbar/NavBar";
import Footer from "./components/navbar/footer/Footer";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/Login"
import SignUp from "./pages/Signup"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import { Routes, Route } from 'react-router-dom'
import ViewBookDetails from "./components/viewbookdetail/ViewBookDetails";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Favourites from "./components/profile/Favourites";
import UserOrderHistory from "./components/profile/UserOrderHistory";
import Settings from "./components/profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/updatebook/:id" element={<UpdateBook />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />}>
          {role === "user" ? <Route index element={<Favourites />} /> :
            <Route index element={<AllOrders />} />
          }
          {role === "admin" && <Route path="/Profile/add-book" element={<AddBook />} />}

          <Route path="/Profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/Profile/settings" element={<Settings />} />

        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
