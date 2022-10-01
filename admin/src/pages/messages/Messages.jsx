import "./messages.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Messages = () => {
  return (
    <div className="messages">
        <Sidebar/>
        <div className="messagesContainer">
            <Navbar/>
            <div className="messagesBox">
            No new messages!
            </div>
        </div>
      
    </div>
  )
}

export default Messages
