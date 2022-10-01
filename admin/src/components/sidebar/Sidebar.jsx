import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { logout } from "../../redux/apiCalls"

const Sidebar = () => {
  const {dispatch} = useContext(DarkModeContext)
  const send = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state)=>state.user?.currentUser);
  const userId = currentUser?._id;

  const handleLogout = ()=>{
    logout(send)
    navigate("/login", {replace: true});


  }

  return (
    <div className="sidebar">
      <div className="top"> 
      <Link to="/" style={{textDecoration: "none"}}>
      <span className="logo"> Home Flora </span> 
      </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to= "/" style={{textDecoration: "none"}}>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
            </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/users" style={{textDecoration: "none"}}>
          <li>
            <PeopleIcon className="icon"/>
            <span>Users</span>
            </li>
            </Link>
            <Link to="/products" style={{textDecoration: "none"}}>
          <li>
            <StorefrontIcon className="icon"/>
            <span>Products</span>
            </li>
            </Link>
            <Link to="/orders" style={{textDecoration: "none"}}>
          <li>
            <ShoppingCartOutlinedIcon className="icon"/>
            <span>Orders</span>
            </li>
            </Link>
            <Link to="/delivery" style={{textDecoration: "none"}}>
            <li>
              <LocalShippingOutlinedIcon className="icon"/>
            <span>Delivery</span>
            </li>
            </Link>
            <p className="title">SOCIAL</p>
            <Link to="/messages" style={{textDecoration: "none", color: "inherit"}}> 
            <li>
              <MailOutlineIcon className="icon"/>
            <span>Messages</span>
            </li>
            </Link>
            <Link to="/notifications" style={{textDecoration: "none", color: "inherit"}}> 
            <li>
              <NotificationsActiveOutlinedIcon className="icon"/>
            <span>Notifications</span>
            </li>
            </Link>
            <p className="title">SERVICE</p>
            <li>
              <MonitorHeartIcon className="icon"/>
            <span>System Health</span>
            </li>
            <li>
              <ArticleOutlinedIcon className="icon"/>
            <span>Logs</span>
            </li>
            <li>
              <SettingsSuggestOutlinedIcon className="icon"/>
            <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <Link to={"/users/"+userId} style={{textDecoration: "none", color: "inherit"}}>
            <li>
              <ContactMailOutlinedIcon className="icon"/>
            <span>Profile</span>
            </li>
            </Link>
            <li onClick={handleLogout}>
              <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
            </li>
        </ul> 
       </div>
      <div className="bottom"> 
      <div className="colorOptions" onClick={()=> dispatch({type: "LIGHT"})}></div>
      <div className="colorOptions" onClick={()=> dispatch({type: "DARK"})}></div>
      </div>
    </div>
  )
}

export default Sidebar
