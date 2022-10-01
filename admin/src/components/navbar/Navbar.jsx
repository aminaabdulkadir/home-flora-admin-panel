import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SearchBar from "../searchBar/SearchBar";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {dispatch} = useContext(DarkModeContext);
  const currentUser = useSelector((state)=>state.user?.currentUser);
  const userId = currentUser?._id;
  
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        <SearchBar/>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon"/>
            English
          </div>
          <div className="item">
            < DarkModeOutlinedIcon className="icon" onClick={()=> dispatch({type: "TOOGLE"})}/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon"/>
          </div>
          <Link to="/messages" style={{textDecoration: "none", color: "inherit"}}> 
          <div className="item">
            <MailOutlineIcon className="icon" />
            <div className="counter"></div>
          </div>
          </Link>
          <Link to="/notifications" style={{textDecoration: "none", color: "inherit"}}> 
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon"/>
            <div className="counter"></div>
          </div>
          </Link>
          
          <Link to={"/users/"+userId} style={{textDecoration: "none", color: "inherit"}}>
          <div className="item">
          <img src= {
              currentUser.img
            ? currentUser.img
             : "https://i.postimg.cc/qR6KdRW8/no-profile-picture-icon-18.png"
             } alt='' className="avatar"/>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
