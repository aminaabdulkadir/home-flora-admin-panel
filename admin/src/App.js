import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/list/UserList";
import ProductList from "./pages/list/ProductList";
import OrderList from "./pages/list/OrderList";
import DeliveryList from "./pages/list/DeliveryList";
import SingleUser from "./pages/single/SingleUser";
import SingleProduct from "./pages/single/SingleProduct";
import NewProduct from "./pages/new/NewProduct";
import NewUser from "./pages/new/NewUser";
import Notification from "./pages/notification/Notification";
import Messages from "./pages/messages/Messages";
import { Routes, Route, Navigate} from "react-router-dom"
import "./style/dark.scss"
import { useContext} from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {useSelector} from"react-redux";



function App() {

  const {darkMode} = useContext(DarkModeContext)
  const user = useSelector((state)=> state.user.currentUser);
  const admin = user?.isAdmin;
  

  
  
  return (
    <div className={ darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/" element={admin
        ? <Home/> : <Navigate to ="login"/>} />
        <Route path="login" element={admin
        ? <Navigate to="/"/>
        : <Login/>} />
        <Route path="users">
          <Route index element={<UserList/>} />
          <Route path=":userId" element={<SingleUser/>} />
          <Route path="new" 
          element={<NewUser />} 
          />
        </Route>
        <Route path="products">
          <Route index element={<ProductList/>} />
          <Route path=":productId" element={<SingleProduct/>} />
          <Route path="new" 
          element={<NewProduct />} 
          />
          </Route>
          <Route path="orders" element={<OrderList/>} />
          <Route path="delivery" element={<DeliveryList/>} />
          <Route path="notifications" element={<Notification />} />
          <Route path="messages" element={<Messages />} />
          
          
        </Routes>
      
    
    </div>
  );

}

export default App;
