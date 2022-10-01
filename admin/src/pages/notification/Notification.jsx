import "./notification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Notification = () => {
  return (
    <div className="notifications">
        <Sidebar/>
        <div className="notificationsContainer">
            <Navbar/>
            <div className="notificationBox">
                No new notifications!
            </div>
        </div>
      
    </div>
  )
}

export default Notification
